const filesystem = require('fs')
const { dialog } = require('electron').remote
const  electron = require('electron');

const allowedTypes = {
    video:['mp4'],
    image:['png','gif','jpeg','jpg']
}

window.scannedData = {
    images: [],
    videos: []
}

const saveLocation = electron.remote.app.getAppPath() + '/data/'
let pendingRecursive = 1;

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
                    filesystem.writeFileSync( saveLocation + 'preferences.json',JSON.stringify(
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
    const loading = document.getElementById("loading-status");
    let files = filesystem.readdirSync( path );

    loading.classList.remove('hide')
    
    files.forEach( ( file ) => {
        if ( filesystem.statSync(path + '/' + file).isDirectory() ) {
            pendingRecursive++;
            context.ReadDirs( path + '/' + file, depth + 1 );
        } else {
            if ( filesystem.statSync( path + '/' + file ).isFile() ) {
                let type = file.substr(file.lastIndexOf('.') + 1);
                
                if ( allowedTypes.image.indexOf(type) > -1 ){
                    window.scannedData.images.push( path + '/' + file );
                } else if ( allowedTypes.video.indexOf(type) > -1 ) {
                    context.FileInfo( path + '/' + file,( info ) => {
                        let vid = {
                            uri:path + '/' + file,
                            info:info,
                            name: file.replace(new RegExp(" ", "g"),'_')
                        }
                        context.GetVideoPreview( path + '/' + file,file,15 )
                        window.scannedData.videos.push( vid );
                    })
                }
            }            
        }
    })

    if ( --pendingRecursive === 0) {
        //Scanning has finished.
        setTimeout(() => {
            loading.classList.add('hide')
            filesystem.writeFile( saveLocation + 'scanned.json', JSON.stringify( window.scannedData ), () => {
                console.log("FILE SAVED")
            } )
        },2000)
    }
}

FileHandler.prototype.FileInfo = function ( file,callback ) {
    filesystem.stat( file, (err,info) => {
        if ( !err ) {
            callback( info )
        }
    })
}

//Checks if there is already a screenshot rendered for the given video.
FileHandler.prototype.CheckVideoScreenShot = function () {

}

FileHandler.prototype.GetVideoPreview = function ( path,name,time ) {
    let video = document.createElement('VIDEO')
    let canvas = document.createElement('CANVAS')
    video.src = path;

    if ( time !== null ) {
        video.currentTime = time
    } else {
        video.currentTime = 0
    }

    video.onloadeddata = function () {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        let ctx = canvas.getContext('2d');
        ctx.drawImage( video,0,0,canvas.width * .15,canvas.height * .15 )
        let data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, "")
        console.log('data/img/image-'+name.replace(new RegExp(" ", "g"),'_')+'.png')
        filesystem.writeFile( 'data/img/image-'+name.replace(new RegExp(" ", "g"),'_')+'.png',data,'base64', ( err ) => {
            if ( err ) {
                console.log( err )
            }
        } )
    }
}

//Checks if scanned and preferences exists and loads them if they do.
LoadScanned = function() {
    filesystem.access ( saveLocation + 'scanned.json', ( err ) => {
        if ( !err ) {
            filesystem.readFile( saveLocation + 'scanned.json','utf8', ( err,data ) => {
                if ( !err ) {
                    window.scannedData = JSON.parse( data )
                    let event = new CustomEvent('scanned-loaded')
                    document.dispatchEvent( event )
                } else {
                    console.log( err );
                }
            })
        } else {
            console.log( err )
        }
    })
}

LoadPrefs = function() {
    filesystem.access( saveLocation + 'preferences.json', ( err ) => {
        if ( !err ) {
            filesystem.readFile( saveLocation + 'preferences.json','utf8', ( err,data ) => {
                if ( !err ) {
                    window.preferences = JSON.parse( data );
                    let event = new CustomEvent('prefs-loaded')
                    document.dispatchEvent( event )
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
    })
}



//Load data when the page loads.
LoadPrefs()
LoadScanned() 

