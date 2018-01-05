
(function() {
    'use strict'
    // Content Scripts <---> Background
    
    const tabRecorder = new TabRecorder()
    const videoPlayer = new VideoPlayer()
    const blobSender = new BlobSender()

    chrome.runtime.onMessage.addListener(function (event) {
        switch (event.cmd) {
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
                        width: 720,
                        height: 480
                    },
                    echoCancellation: true,
                    timeslice: 1
                }
                if ( event.param.video || event.param.audio ) {
                    tabRecorder.start( option ).then( function (stream) {
                        videoPlayer.start( stream )
                    });

                    //chrome.tabs.executeScript(null, {file: 'content.captureMic.js'});
                    return;
                }
                notifyToContentScripts({
                    result: '비디오와 오디오가 모두 OFF 여서 녹화를 진행하지 않습니다.'
                })
                // if ( event.param.video && event.param.audio) {
                //     notifyToContentScripts({
                //         result: '오디오 비디오 모두 녹화합니다..'
                //    })
                //    return;
                // }

                // if ( event.param.video ) {
                //     notifyToContentScripts({
                //         result: '비디오만 녹화합니다..'
                //    })
                //    return;
                // }

                // if ( event.param.audio ) {
                //     notifyToContentScripts({
                //         result: '오디오만 녹화합니다..'
                //    })
                //    return;
                // }
                break;

            case 'capture:stop':
                tabRecorder.stop().then( function (blob) {
                    videoPlayer.getPlayers().forEach( function (player) {
                        player.src = null
                    })
                    videoPlayer.clearPlayers()

                    let userId = 'ctest1' // 나중에 받아 올 것 / 이것은 폴더...
                    let roomId = 'room' // 나중에 받아 올 것 / 이것은 폴더...
                   
                    blobSender.sendToServer({
                        blobData: blob,
                        url: 'http://localhost:7777/record/upload/' + userId,
                       // url: 'https://localhost:8001/record/upload/' + userId,
                        //url: 'https://192.168.2.253:8001/record/upload/' + userId,
                        filename: roomId + '_tab',
                        fieldname: 'record'
                    })
                });

                notifyToContentScripts({
                    result: '녹화를 중지합니다...'
                })

            break;
        }            
    })

    
    
    // 현재 열려있는 탭에 메세지 보내기
    function notifyToContentScripts(message) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        });
      }
})();

