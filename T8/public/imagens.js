function showImage(name, mimetype){

    var fileObj = $(`
        <div class="w3-row w3-margin">
            <div class="w3-col s6>
                ${ficheiro}
            </div>
            <div class="w3-col s6 w3-border">
               <p>Filename: ${name}</p>
               <p>Mimetype: ${mimetype}</p>
            </div>
        </div>
    `)



    if(mimetype == 'image/png' || mimetype == 'image/jpeg'){
        var ficheiro = $('<img src="fileStore/' + name + '" width="80%"/>')
    }
    else{
        var ficheiro = $('<p>' + name + ", " + mimetype + '</p>')
    }
    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>')
    $('#display').empty()
    $('#display').append(ficheiro, download)
    $('#display').modal()
}

const { format } = require("path")

function add()
{
    var aux = $(`
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
                <input class="w3-input w3-border xw3-light-grey" type="file" name="myFile">
            </div>
        </div>
    `)

    $("#form").append(aux)
}