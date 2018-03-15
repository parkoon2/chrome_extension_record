const VideoPlayer = (function () {
    
    function VideoPlayer () {
        this.video = document.createElement( 'video' );
        this.videoPlayers = []
    }

    VideoPlayer.prototype.start = function ( stream ) {
        document.body.appendChild( this.video );
        this.video.src = URL.createObjectURL( stream );
        this.video.play();
        this.videoPlayers.push( this.video )
    }

    VideoPlayer.prototype.getPlayers = function () {
        return this.videoPlayers
    }

    VideoPlayer.prototype.clearPlayers = function () {
        this.videoPlayers = []
    }

    return VideoPlayer;
})()
