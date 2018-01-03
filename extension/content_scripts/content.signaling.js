

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
        

                switch ( event.data.cmd ) {
                    case 'capture:start':
                    // 오디오 한다고 할 때에만..
                    
                    if ( event.data.param.audio ) {  // 이부분 생각해볼 것 ... 로직 이상함..

                        const option = {
                            echoCancellation: true, 
                            noiseSuppression: true,
                            timeslice: 1
                        }
                        micRecorder.start( option )
                        break
                    }
        
                    case 'capture:stop':
                    micRecorder.stop().then( function (blob) {
        
                        // Web에서 받아올 정보들...
                        // 1. userId / 2. roomId / 3. upload 주소
        
        
                        let userId = 'ctest1' // 나중에 받아 올 것 / 이것은 폴더...
                        let roomId =  new Date().valueOf() + 'room' // 나중에 받아 올 것 / 이것은 폴더...
                        blobSender.sendToServer({
                            blobData: blob,
                            //url: 'http://localhost:7777/record/upload/' + userId,
                            url: 'https://localhost:8001/record/upload/' + userId,
                            filename: roomId + '_mic',
                            fieldname: 'record'
                        })
                    });
                    break
                }
    

        let cmd = event.data.cmd
        let param = event.data.param

        chrome.runtime.sendMessage({
             cmd: cmd,
             param: param
        })
    })




})();
