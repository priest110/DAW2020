var http = require('http')
var axios = require('axios')
var fs = require('fs') /* Para trabalhar com o File System */

var {parse} = require('querystring')
var static = require('./static')

// Aux. Functions
// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// Funções auxilidares

// Template para o formulário de inserção de Tarefa ------------------
function geraFormTarefa( tarefas, d ){
    var id = 0

    tarefas.forEach(i => {
        if(i.id > id)
            id = i.id
    });
    id = Number(id) + 1

    return `
            <div class="w3-container w3-dark-grey">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">
                <input type="hidden" name="id" value="${id}">

                <label class="w3-text-dark-grey"><b>Data de criação</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="dateCreated">
          
                <label class="w3-text-dark-grey"><b>Deadline</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="dateDued">

                <label class="w3-text-dark-grey"><b>Quem faz</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="who">

                <label class="w3-text-dark-grey"><b>Descrição da Tarefa</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="what">
          
                <label class="w3-text-dark-grey"><b>Tipo de Tarefa</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="type">
                
                <input type="hidden" name="state" value="ToDo">

                <input class="w3-btn w3-dark-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-dark-grey" type="reset" value="Limpar valores"/> 
            
            </form>
    `
}

// Template para o formulário de edição de Tarefa ------------------
function geraFormTarefaFeita( t ){

    let pagHTML = `
            <div class="w3-container w3-dark-grey">
                <h2>Registo de Tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas/feita" method="POST">
                <input type="hidden" name="id" value="${t.id}">

                <label class="w3-text-dark-grey"><b>Data de criação</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="dateCreated" value="${t.dateCreated}">
          
                <label class="w3-text-dark-grey"><b>Deadline</b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="dateDued" value="${t.dateDued}>

                <label class="w3-text-dark-grey"><b>Quem faz</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="who" value="${t.who}">

                <label class="w3-text-dark-grey"><b>Descrição da Tarefa</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="what" value="${t.what}">
          
                <label class="w3-text-dark-grey"><b>Tipo de Tarefa</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="type" value="${t.type}">
    `
    var x = ""
    var y = "checked"

    pagHTML += `<label class="w3-text-dark-grey"><b>Estado</b></label>
                <input class="w3-radio w3-border w3-light-grey" type="radio" name="state" value="ToDo" ${x}>
                <label>To Do</label>
                <input class="w3-radio w3-border w3-light-grey" type="radio" name="state" value="Done" ${y}>
                <label>Done</label>

                <input class="w3-btn w3-dark-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-dark-grey" type="reset" value="Limpar valores"/> 
            
            </form>`

    return pagHTML
}

// Template para a head da página
function head(){
    return `
    <html>
        <head>
            <title>Lista de tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="../w3.css"/>
        </head>
        <body>
`
}

// Template para a lista das tarefas por fazer
function tarefasToDo(tarefas){
    let pagHTML = `
        <div class="w3-container w3-dark-grey">
            <h2>Lista de tarefas por fazer</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Data de criação</th>
                <th>Deadline</th>
                <th>Quem fez</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Opção</th>  
            </tr>
    `
    tarefas.forEach(i => {
        if(i.state == "ToDo")
          pagHTML += `
            <tr>
                <td>${i.dateCreated}</td>
                <td>${i.dateDued}</td>
                <td>${i.who}</td>
                <td>${i.what}</td>
                <td>${i.type}</td>
                <td><a href="/tarefas/feita/${i.id}"><button class="w3-button w3-green">Editar</a></td>
                </tr>
    `});
    return pagHTML
}

// Template para a lista das tarefas feitas
function tarefasDone(tarefas){
    let pagHTML = `
        </table>
        <div class="w3-container w3-dark-grey">
            <h2>Lista de tarefas feitas</h2>
        </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Data de criação</th>
                <th>Deadline</th>
                <th>Quem fez</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Opção</th>
            </tr>
    `
    tarefas.forEach(i => {
        if(i.state == "Done")
          pagHTML += `
            <tr>
                <td>${i.dateCreated}</td>
                <td>${i.dateDued}</td>
                <td>${i.who}</td>
                <td>${i.what}</td>
                <td>${i.type}</td>
                <td><a href="/tarefas/apagada/${i.id}"><button class="w3-button w3-red">Apagar</a></td>
            </tr>
    `});
    return pagHTML
}

// Template para o footer
function footer(d){
    return `        
        </table>
        <div class="w3-container w3-dark-grey">
            <address>TPC6::DAW2020 - ${d}</address>
        </div>
    </body>
</html>
`
}

// Template para a página com a lista de tarefas por fazer------------------
function geraPagtarefas(tarefas, d){
    // Template para a head da página
    let pagHTML = head()

    // Template para o formulário de inserção de Tarefa
    pagHTML += geraFormTarefa(tarefas,d)
    
    // Lista de tarefas por fazer
    pagHTML += tarefasToDo(tarefas)

    // Lista de tarefas feitas
    pagHTML += tarefasDone(tarefas)

    // Footer
    pagHTML += footer(d)

    return pagHTML
}

// Template para a página com a lista de tarefas atualizada após edição ------------------
function geraPagTarefaFeita(tarefas, Tarefa, d){
    // Template para a head da página
    let pagHTML = head()

    // Template para o formulário de inserção de Tarefa
    pagHTML += geraFormTarefaFeita(Tarefa,d)
    
    // Lista de tarefas por fazer
    pagHTML += tarefasToDo(tarefas)

    // Lista de tarefas feitas
    pagHTML += tarefasDone(tarefas)

    // Footer
    pagHTML += footer(d)

    return pagHTML
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm(d){
    return `
    <html>
    <head>
        <title>Lista de tarefas</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-dark-grey">
                <h1>Done.</h1>
            </header>
            <div class="w3-container">
                <p><a href="/tarefas">Voltar.</a></p>
            </div>
        </div>
    </body>
    </html>
    `
}


// Criação do servidor

var server = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    // Tratamento do pedido
    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req,res)
    } 

    else{
        switch(req.method){
            case "GET": 
                // GET /tarefas --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tarefas")){
                    axios.get("http://localhost:3000/tarefas?_sort=who")
                        .then(response => {
                            var tarefas = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPagtarefas(tarefas, d))
                            res.end()
                            
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Erro ao obter a lista de tarefas!</p>")
                            res.end()
                        })
                }
                else if(req.url.match(/\/tarefas\/feita\/[0-9]+/)){
                    var id = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tarefas/" + id)
                        .then(response => {
                            let Tarefa = response.data
                            axios.get("http://localhost:3000/tarefas")
                                .then(response => {
                                    var tarefas = response.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(geraPagTarefaFeita(tarefas,Tarefa,d))
                                    res.end()       
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>404</p>")
                                    res.end()
                                })   
                        }) 
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>404</p>")
                            res.end()
                        })
                
                    
                }else if(req.url.match(/\/tarefas\/apagada\/[0-9]+/)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/tarefas/" + id)
                        .then(response => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPostConfirm(d))
                            res.end()
                            
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>404</p>")
                            res.end()
                        })
                }                    
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " nÃ£o suportado neste serviço.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/tarefas'){
                    recuperaInfo(req, resultado => {
                        console.log('POST de Tarefa:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tarefas', resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraPostConfirm(d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                else if(req.url == '/tarefas/feita'){
                    recuperaInfo(req, resultado => {
                        console.log('PUT de Tarefa:' + JSON.stringify(resultado))
                        axios.put('http://localhost:3000/tarefas/'+ resultado.id, resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraPostConfirm(d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>PUT: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " nÃ£o suportado neste serviço.</p>")
                res.end()
        }
    }
    
})

server.listen(7777)
console.log('Servidor à escuta na porta 7777...')