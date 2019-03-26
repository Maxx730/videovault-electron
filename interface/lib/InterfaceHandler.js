function InterfaceHandler() {
    var context = this;

    this.resizing;

    //VIDEO PLAYBACK CONTROLS HERE.
    this.stage = document.getElementsByClassName("video-stage")[0];
    this.closeStage = document.getElementById("CloseStage");
    this.playButton = document.getElementById("PlayControl");
    this.pauseButton = document.getElementById("PauseControl");
    this.videoProgress = document.getElementById("VideoProgress");

    this.timeInterval;

    //VIDEO STAGE CONTROLS CONFIGURED HERE.
    this.closeStage.addEventListener('click', () => {
        this.stage.classList.add('hide');
        window.videoFileHandler.Pause()
        this.playButton.classList.remove('hide')
        this.pauseButton.classList.add('hide')
    })

    this.playButton.addEventListener('click',() => {
        window.videoFileHandler.Play()
        this.playButton.classList.add('hide')
        this.pauseButton.classList.remove('hide')

        this.timeInterval = setInterval(() => {
            this.videoProgress.value = window.videoFileHandler.Time()
        },100)
    })

    this.pauseButton.addEventListener('click',() => {
        window.videoFileHandler.Pause()
        this.playButton.classList.remove('hide')
        this.pauseButton.classList.add('hide')
        clearInterval(this.timeInterval);
    })




    this.content = document.getElementById("scrollable-video-content")
    this.topNavigation = document.getElementById("topNavigationMenu")
    this.settingsIcon = document.getElementById('settingsToggle')
    this.options = document.querySelectorAll(".options-column ul li")
    this.screens = document.querySelectorAll(".screen-content")
    
    for ( var i = 0; i < this.options.length; i++ ) {
        this.options[i].addEventListener('click', function () {
            for ( var k = 0; k < context.options.length; k++) {
                context.options[k].classList.remove('selected');
                context.screens[k].classList.remove('focused')
                context.screens[k].style.display = ''
            }

            document.getElementById(this.children[1].innerText).classList.add('focused')
            this.classList.add('selected')

            let event = new CustomEvent('screen-changed',{
                detail :{
                    screen: this.children[1].innerText
                }
            })

            document.getElementById(this.children[1].innerText).dispatchEvent(event)
        })
    }

    for ( var i = 0; i < this.screens.length; i++ ) {
        this.screens[i].addEventListener('screen-changed',( event ) => {
            switch ( event.detail.screen ) {
                case "Images":
                    console.log("LOADING IMAGES FROM DATA OBJECT NOW!")
                break;
            }
        })
    }

    document.addEventListener('scanned-loaded',function() {
        let videos = document.getElementById("VideoList");

        for ( let i = 0;i < window.scannedData.videos.length;i++ ) {
            videos.innerHTML += "<li class = 'video-button' style='background-image:url(data/img/image-" + window.scannedData.videos[i].name + ".png)' uri = '" + window.scannedData.videos[i].uri + "'><div class = 'video-highlight'></div><i class='material-icons'>play_circle_filled_white</i>" + window.scannedData.videos[i].uri + "</li>"
        }

        let buttons = document.getElementsByClassName('video-button');

        for ( let k = 0;k < buttons.length;k++ ) {
            buttons[k].addEventListener( 'click',() => {
                window.videoFileHandler.Begin( buttons[k].getAttribute('uri'),context.AlignScreen )
                context.stage.classList.remove('hide')
            } )
        }
    })

    window.onresize = function() {
        clearTimeout( this.resizing ) 
        let videoItems = document.getElementsByClassName('screen-content')

        for ( let i = 0;i < videoItems.length;i++ ) {
            videoItems[i].style.display = 'none'
        }

        this.resizing = setTimeout( () => {
            for ( let i = 0;i < videoItems.length;i++ ) {
                if ( videoItems[i].classList.contains('focused') ) {
                    videoItems[i].style.display = 'flex'
                }
            }
        },50 )
        context.AlignScreen()
    }
}

InterfaceHandler.prototype.AlignScreen = function() {
    document.getElementsByClassName('video-player')[0].style.top = ((window.innerHeight - document.getElementsByTagName("VIDEO")[0].clientHeight) / 2) + 'px'
}