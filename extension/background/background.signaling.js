
(function() {
    'use strict'
    // Content Scripts <---> Background
    
    const tapCapture = new TapCapture()
    

    chrome.runtime.onMessage.addListener(function (event) {
        switch (event.cmd) {
            case 'capture:status':
                notifyToContentScripts({
                    result: captureStatus.record
                })
                break;

            case 'capture:start':
                const topOption = {
                    isVideo: event.param.video,
                    isAudio: event.param.audio
                }
                if ( event.param.video || event.param.audio ) {
                    tapCapture.do( topOption ).then( function () {
                        console.log('시작중')
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
                tapCapture.done();

                //chrome.tabs.executeScript(null, {file: 'content.stopMic.js'});
                
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

