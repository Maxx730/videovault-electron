
VideoFileHandler = function() {
    this.uri,this.data = [],context = this;
}

VideoFileHandler.prototype.Begin = function( uri,callback ) {
    document.getElementById("VideoSource").src = 'file:' + uri
    document.getElementsByTagName("VIDEO")[0].load()
}

VideoFileHandler.prototype.Play = function() {
    document.getElementsByTagName("VIDEO")[0].play()
}

VideoFileHandler.prototype.Pause = function() {
    document.getElementsByTagName("VIDEO")[0].pause()
}

VideoFileHandler.prototype.Time = function() {
    return (document.getElementsByTagName("VIDEO")[0].currentTime / document.getElementsByTagName("VIDEO")[0].duration) * 100;
}

VideoFileHandler.prototype.StartStream = function( path ) {
    let context = this;
    let readStream = filesystem.createReadStream( path );

    readStream.on( 'data', ( chunk ) => {
        context.data = context.data.concat(chunk)
        console.log(context.data)
    }).on( 'error',( err ) => {
        console.log("ERROR STREAMING CHUNK")
    }).on( 'end',() => {
        console.log("STREAMING FILE HAS ENDED")
    })
}