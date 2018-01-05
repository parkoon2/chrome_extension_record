

// Web <---> Content scripts
(function() {
    'use strict'

    let namespace = 'capture'
    const micRecorder = new MicRecorder();
    const blobSender = new BlobSender();

    console.log('content:signaling')


    chrome.runtime.onMessage.addListener(function (message) {
        
        console.log('result in content scripts', message, location.origin)
    });
    
    window.addEventListener('message', function(event) {
        console.log(event.data,'in content')
        
        let cmd = event.data.cmd
        let param = event.data.param ? event.data.param : {} // param을 고정으로 보내주면 이럴 필요 없음...어떤게 맞을지는 생각!
        
    

        switch ( cmd ) {
            case 'capture:start':
            const option = {
                echoCancellation: true, 
                noiseSuppression: true,
                timeslice: 1
            }
            // getUserMedia를 background에서는 사용할 수 없으니 content scripts에서 사용한다.
            if ( param.audio ) {
                micRecorder.start( option )
            }
            break
            case 'capture:stop':
            micRecorder.stop().then( function (blob) {

                // Web에서 받아올 정보들...
                // 1. userId / 2. roomId / 3. upload 주소
                let userId = 'ctest1' // 나중에 받아 올 것 / 이것은 폴더...
                let roomId = 'room' // 나중에 받아 올 것 / 이것은 폴더...
                blobSender.sendToServer({
                    blobData: blob,
                    url: 'http://localhost:7777/record/upload/' + userId,
                    //url: 'https://localhost:8001/record/upload/' + userId,
                   // url: 'https://192.168.2.253:8001/record/upload/' + userId,
                    
                    filename: roomId + '_mic',
                    fieldname: 'record'
                })
            });
            break
        }
        
        chrome.runtime.sendMessage({
             cmd: cmd,
             param: param
        })
    })




})();
