(function() {

    let namespace = 'capture'
    const micRecorder = new MicRecorder();
    const blobSender = new BlobSender();

    // Background ~> Content Scripts
    chrome.runtime.onMessage.addListener(function (message) {
        
        console.log('result in content scripts', message, location.origin)

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
        }

        window.dispatchEvent(event);
    });
    
    // Web ~> Content Scripts
    window.addEventListener( 'message', function(event) {
        
        const cmd   = event.data.cmd
        const param = event.data.param ? event.data.param : {} 
        
        console.log('param', param)
        if ( param.audio ) {

            switch ( cmd ) {
                case 'capture:start':
                    micRecorder.start({
                        echoCancellation: param.echoCancellation, 
                        noiseSuppression: param.noiseSuppression,
                        timeslice       : param.timeslice
                    })
                    break
                case 'capture:stop':
                    micRecorder.stop().then( function (blob) {
        
                        blobSender.sendToServer({
                            
                            blobData: blob,
                            url: param.url,
                            filename: param.filename + '_mic',
                            fieldname: param.filedname

                        }).then( function (result) {
                            if ( !result ) return;
                            console.log( ' 믹싱 끝!' )
                                
                        });
                    });
                    break
            }
        }            
        
        // Content Scripts ~> Background
        chrome.runtime.sendMessage({
             cmd  : cmd,
             param: param
        })
    })

})();


