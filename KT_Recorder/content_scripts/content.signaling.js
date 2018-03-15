(function() {

    let namespace = 'capture'
    const micRecorder = new MicRecorder();
    const blobSender = new BlobSender();

    // Background ~> Content Scripts
    chrome.runtime.onMessage.addListener(function (message) {
        
        let event, eventName
       
        switch ( message.cmd ) {
            case 'record:done':
                eventName = 'recordDone'
                event = new CustomEvent(eventName, {
                    detail: {
                        filepath: message.data
                    }
                });
                break
            case 'status:change':
                eventName = 'captureStatus'
                event = new CustomEvent(eventName, {
                    detail: {
                        status: message.data
                    }
                });
                break
        }

        window.dispatchEvent(event);
    });
    
    // Web ~> Content Scripts
    window.addEventListener( 'message', function(event) {
        
        const cmd   = event.data.cmd
        const param = event.data.param ? event.data.param : {} 
        
        if ( param.audio ) {

            switch ( cmd ) {
                case 'capture:start':
                    micRecorder.start({
                        echoCancellation: param.echoCancellation, 
                        noiseSuppression: param.noiseSuppression,
                        timeslice       : param.timeslice
                    })
                    break;
                case 'capture:stop':
                    micRecorder.stop().then( function (blob) {
        
                        blobSender.sendToServer({
                            
                            blobData : blob,
                            url      : param.url,
                            filename : param.filename + '_mic',
                            fieldname: param.filedname

                        }).then( function (result) {
                            // 서버에서 결과값으로 null 또는...모두 완료의 메세지를 던져주는데
                            // 모두 완료의 경우는 마이크와 음성이 모두 업로드 되고 Mixing이 완료되었다는 것인데...
                            if ( !result ) return;
                        });
                    });
                    break;
            }
        }            
        
        // Content Scripts ~> Background
        chrome.runtime.sendMessage({
             cmd  : cmd,
             param: param
        })
    })

})();


