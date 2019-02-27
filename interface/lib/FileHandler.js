const filesystem = require('fs')
const { dialog } = require('electron').remote

FileHandler = function(exportButton) {
    exportButton.addEventListener('click',function(content){
        dialog.showSaveDialog({ filters: [
            { name: 'json', extensions: ['json'] }
           ]},(filename) => {
            if( filename === undefined ) return;

            filesystem.writeFile(filename,content,(err) => {
                if(err) {
                    alert(err.message)
                }else{
        
                }
            })
        })
    })    
}

