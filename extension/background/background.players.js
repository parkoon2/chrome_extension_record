const video = document.createElement( 'video' );
let videoPlayers = []

function startVideoPlayer ( stream ) {
    document.body.appendChild( video );
    video.src = URL.createObjectURL( stream );
    video.play();
    videoPlayers.push( video )
}