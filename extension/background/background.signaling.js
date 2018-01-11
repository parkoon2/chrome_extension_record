
// Content Scripts ~> Background
chrome.runtime.onMessage.addListener( function (event) {

    const tabCapturer = new TabCapturer()
    const videoPlayer = new VideoPlayer()
    const blobSender  = new BlobSender()
    const common      = new Common()

    switch ( event.cmd ) {
        case 'capture:status':
            common.notifyToContentScripts({
                result: captureStatus.record
            })
            break;

        case 'capture:start':

            const option = {
                isVideo: event.param.video,
                isAudio: event.param.audio,
                resolution: {
                    width: event.param.width,
                    height: event.param.height
                },
                echoCancellation: event.param.echoCancellation,
                timeslice: event.param.timeslice,
                framerate: event.param.framerate
            }

            tabCapturer.start( option ).then( function (stream) {
                videoPlayer.start( stream )
            });

            break;

        case 'capture:stop':
            tabCapturer.stop().then( function (blob) {
                
                videoPlayer.getPlayers().forEach( function (player) {
                    player.src = null
                })
                videoPlayer.clearPlayers()
  
                blobSender.sendToServer({
                    blobData: blob,
                    url: event.param.url,
                    filename: event.param.filename + '_tab',
                    fieldname: event.param.filedname
                }).then( function ( result ) {
 
                    if ( !result ) return;
                    common.notifyToContentScripts({
                        cmd: 'record:done',
                        data: result
                    })
                })
            });
        break;
    }            
})
