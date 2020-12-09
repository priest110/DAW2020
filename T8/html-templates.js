
exports.geraPostConfirm = geraPostConfirm
exports.fileList = fileList
exports.fileForm = fileForm

// File List HTML Page Template  -----------------------------------------
function fileList( files, d){
    let pagHTML = `
      <html>
          <head>
              <title>File List</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <link rel="stylesheet" href="/w3.css"/>
              <script src="/jquery-3.5.1.min.js"></script>
              <script src="/imagens.js"></script>
              <script src="/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="/jquery.modal.min.css" />
          </head>
          <body>
              <div class="w3-card-4 modal" id="display"></div>
              <div class="w3-container w3-teal">
                  <h2>File List</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Date</th>
                      <th>File</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Type</th>
                  </tr>
    `
    files.forEach( f => {
      pagHTML += `
          <tr onclick='showImage("${f.name}", "${f.mimetype}");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.desc}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })
  
    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
              <address>TPC8</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
  }

// File Form HTML Page Template ------------------------------------------
function fileForm( d ){
    return `
    <html>
        <head>
            <title>File Upload</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/favicon.png"/>
            <script src="/jquery-3.5.1.min.js"></script>
            <script src="/imagens.js"></script>
            <link rel="stylesheet" href="/w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>File Upload</h2>
            </div>
            <form class="w3-container" action="/files" method="POST" enctype="multipart/form-data" id="form">
                <div class="w3-row w3-margin-bottom">
                    <div class="w3-col s3">
                        <label class="w3-text-teal">Description</label>
                    </div> 
                    <div class=""w3-col s9 w3-border">
                        <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
                    </div>
                </div>
                <div class="w3-row w3-margin-bottom">
                    <div class="w3-col s3">
                        <label class="w3-text-teal">Select File</label>
                    </div> 
                    <div class=""w3-col s9 w3-border">
                        <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
                    </div>
                </div>
                <input class="w3-btn w3-blue-grey" style="margin:10px" type="submit" value="Submit"/>
                    
                
            </form>
            </div class="w3-container">
                <button class="w3-btn w3-blue-grey" style="margin-left:25px" onclick='add()'>+ File</button>
            <div>
            <footer class="w3-container w3-teal">
                <address>TPC8</address>
            </footer>
        </body>
    </html>
    `
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( aluno, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id} inserido</h1>
            </header>
            <div class="w3-container">
                <p><a href="/alunos/${aluno.id}">Aceda aqui à  sua página."</a></p>
            </div>
            <footer class="w3-container w3-teal">
                <address>TPC8 - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}