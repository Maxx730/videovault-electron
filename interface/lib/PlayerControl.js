var player;
var interval;
var context;

function PlayerControl() {
    player = new YT.Player('ytplayer', {
        videoId: 'GBUCmMxmup0',
        playerVars: {
            controls: 0,
            start: 0,
            autoplay: 1
        },
        events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.PlayeronPlayerStateChange
        }
    });

    this.duration = 0;
    this.current = 0;
    context = this;

    this.playerSlider = document.getElementById('youtubeRange')
    this.playToggle = document.getElementById('playPauseToggle')

    this.playerSlider.addEventListener( 'change', function( event ) { 
        player.seekTo(event.target.value,true)
        context.translateToTime( event.target.value )
    })

    this.playToggle.addEventListener( 'click',function(event) {
        switch( context.playToggle.innerText ) {
            case 'pause':
                player.pauseVideo()
                context.playToggle.innerText = 'play_arrow'
            break;
            case 'play_arrow':
                player.playVideo()
                context.playToggle.innerText = 'pause'
            break;
        }
    })
}

PlayerControl.prototype.onPlayerReady = function() {
    context.duration = player.getDuration()
}

PlayerControl.prototype.PlayeronPlayerStateChange = function() {
    switch( player.getPlayerState() ) {
        case 1:
            interval = setInterval(function () {
                context.playerSlider.value = ( player.l.currentTime / player.l.duration ) * 100
            },1000)
        break;
        case 2:
            clearInterval(interval)
        break;
    }
}

PlayerControl.prototype.translateToTime = function( value ) {
    console.log( player.getDuration() * ( context.current / 100 ) )
}