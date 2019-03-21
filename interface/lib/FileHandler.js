const filesystem = require('fs')
const { dialog } = require('electron').remote
const  electron = require('electron');

const allowedTypes = {
    video:[],
    image:['png','gif','jpeg','jpg']
}

window.scannedData = {
    images: [],
    videos: []
}

const saveLocation = electron.remote.app.getAppPath() + '/data/'

let pendingRecursive = 1;
let pendingDirs = 0;

FileHandler = function(exportButton) {
    const context = this;
    exportButton.addEventListener('click',function(content){
        dialog.showOpenDialog({
            properties: ['openDirectory']
        },( paths, err ) => {
            if ( paths.length > 0) {
                for( let i = 0;i < paths.length;i++ ) {
                    window.scannedData = {
                        images: [],
                        videos: []
                    }
                    pendingRecursive = 1;
                    document.getElementById("RootPathInput").value = paths[i];
                    filesystem.writeFileSync( saveLocation + 'prefereces.json',JSON.stringify(
                        {
                            root:paths[i]
                        }
                    ))
                    context.ReadDirs( paths[i], 0 );
                }
            }else {
                console.log("error opening directory!")
            }
        })
    })    
}

//Recursive function to read through all the sub directories of a folder.
FileHandler.prototype.ReadDirs = function ( path, depth ) {
    const context = this;

    let files = filesystem.readdirSync( path );
    
    files.forEach( ( file ) => {
        if ( filesystem.statSync(path + '/' + file).isDirectory() ) {
            pendingDirs++;
            pendingRecursive++;
            context.ReadDirs( path + '/' + file, depth + 1 );
        } else {
            if ( filesystem.statSync( path + '/' + file ).isFile() ) {
                let type = file.substr(file.lastIndexOf('.') + 1);
                
                if ( allowedTypes.image.indexOf(type) > -1 ){
                    window.scannedData.images.push( path + '/' + file );
                }
            }            
        }
    })

    if ( --pendingRecursive === 0) {
        //Scanning has finished.
        filesystem.writeFileSync( saveLocation + 'scanned.json', JSON.stringify( window.scannedData ) )
        pendingDirs--
    }
}

