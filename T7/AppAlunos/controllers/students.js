//Student controller

var Student = require('../models/students')

//Return student list
module.exports.list = () => {
	return Student
		.find()
		.sort({nome:1})
		.exec()
}

//Return student list
module.exports.lookup = id => {
	return Student
		.findOne({numero: id})
		.exec()
}

//Return student
module.exports.exists = (id, callback) => {
    Student
        .findOne({numero: id})
        .exec()
        .then(data => callback(null, data))
}

//Return student list
module.exports.insert = student => {
	var values = [0,0,0,0,0,0,0,0];
    if (student.tpc1 == 'on')
        values[0] = 1
    if (student.tpc2 == 'on')
        values[1] = 1
    if (student.tpc3 == 'on')
        values[2] = 1
    if (student.tpc4 == 'on')
        values[3] = 1
    if (student.tpc5 == 'on')
        values[4] = 1
    if (student.tpc6 == 'on')
        values[5] = 1
    if (student.tpc7 == 'on')
        values[6] = 1
    if (student.tpc8 == 'on')
        values[7] = 1

    var aux = new Student(student)
    aux.tpc = values
	return aux.save()
}

module.exports.edit = (student, id) => {
    var values = [0,0,0,0,0,0,0,0];
    if (student.tpc1 == 'on')
        values[0] = 1
    if (student.tpc2 == 'on')
        values[1] = 1
    if (student.tpc3 == 'on')
        values[2] = 1
    if (student.tpc4 == 'on')
        values[3] = 1
    if (student.tpc5 == 'on')
        values[4] = 1
    if (student.tpc6 == 'on')
        values[5] = 1
    if (student.tpc7 == 'on')
        values[6] = 1
    if (student.tpc8 == 'on')
        values[7] = 1

    return Student 
        .findOneAndUpdate({numero: id},{$set: {nome: student.nome, git: student.git, tpc: values}})
        .exec()
}

module.exports.delete = id => {
    return Student 
        .findOneAndDelete({numero: id})
        .exec()
}