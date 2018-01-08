
// Content Scripts ~> Background
chrome.runtime.onMessage.addListener( function (event) {

    const tabCapturer = new TabCapturer()
    const videoPlayer = new VideoPlayer()
    const blobSender  = new BlobSender()

    switch ( event.cmd ) {
        case 'capture:status':
            notifyToContentScripts({
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
                timeslice: event.param.timeslice
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
                    notifyToContentScripts({
                        cmd: 'record:done',
                        data: result
                    })
                })
            });
        break;
    }            
})

// 현재 열려있는 탭에 메세지 보내기
function notifyToContentScripts(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

