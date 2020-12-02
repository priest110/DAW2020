var express = require('express');
var router = express.Router();

var Student = require('../controllers/students')

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Turma de DAW 2020' })
})

router.get('/alunos', function(req, res) {
	//Data retrieve
	Student.list()
		.then(data => res.render('students', { list: data }))
		.catch(err => res.render('error', {error : err}))
})

router.get(/\/alunos\/(A|PG)[0-9]+$/, function(req, res) {
	var id = req.url.split("/")[2]

	Student.lookup(id)
		.then(data => res.render('student', { info: data }))
		.catch(err => res.render('error', { error : err }))
})

router.get('/alunos/registar', function(req, res, next) {
  	res.render('register')
})

router.get('/alunos/editar/:id', function(req, res) {
	Student.lookup(req.params.id)
		.then(data => res.render('edit', { info: data }))
		.catch(err => res.render('error', { error : err }))
})

router.get('/alunos/delete/:id', function(req, res) {
	Student.delete(req.params.id)
		.then(res.redirect('/alunos'))
		.catch(err => res.render('error', { error : err }))
})

router.post('/alunos',function(req,res){
  Student.exists(req.body.numero, function(err, student) {
    if (err) {
      next(err)
    }
    else if (student) {
      res.redirect('/alunos')
    }
    else {
      Student.insert(req.body)
        .then(res.redirect('/alunos'))
        .catch(err => res.render('error', {error: err}))
    }
  })
})

router.post('/alunos/:id', function(req, res) {
	Student.edit(req.body, req.params.id)
		.then(res.redirect("/alunos/" + req.params.id))
		.catch(err => res.render('error', { error : err }))
})

module.exports = router
