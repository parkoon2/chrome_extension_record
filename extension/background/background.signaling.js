
(function() {
    'use strict'

    // Content Scripts <---> Background
    chrome.runtime.onMessage.addListener(function (event) {
        console.log(event)
        switch (event.cmd) {
            case 'capture:status':
                notifyToContentScripts({
                    result: captureStatus.record
                })
                break;

            case 'capture:start':

                if ( event.param.video && event.param.audio) {
                    notifyToContentScripts({
                        result: '오디오 비디오 모두 녹화합니다..'
                   })
                   return;
                }

                if ( event.param.video ) {
                    notifyToContentScripts({
                        result: '비디오만 녹화합니다..'
                   })
                   return;
                }

                if ( event.param.audio ) {
                    notifyToContentScripts({
                        result: '오디오만 녹화합니다..'
                   })
                   return;
                }
                break;

            case 'capture:stop':
                notifyToContentScripts({
                    result: '녹화를 중지합니다...'
                })
            break;
        }            
    })

    
    
    // 현재 열려있는 탭에 메세지 보내기
    function notifyToContentScripts(message) {
        console.log('notifyToContentScripts', message)
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        });
      }
})();

