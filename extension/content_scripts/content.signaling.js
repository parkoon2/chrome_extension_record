

// Web <---> Content scripts
(function() {
    'use strict'

    let namespace = 'capture'

    console.log('content:signaling')


    chrome.runtime.onMessage.addListener(function (message) {
        
        console.log('result in content scripts', message, location.origin)
    });
    
    window.addEventListener('message', function(event) {
        console.log(event.data,'asasa')

        if (event.data.cmd)

        switch ( event.data.cmd ) {
            case 'capture:start':
            // 오디오 한다고 할 때에만..
            captureStart()
            break

            case 'capture:stop':
            captureStop()
            break
        }
        // let video = document.createElement( 'video' )

        // var audio = document.querySelector('audio');
        
        // var constraints = window.constraints = {
        //     audio: { echoCancellation: true , sampleRate: 20000},
        //   video: false
        // };
        
        // function handleSuccess(stream) {
        //   var audioTracks = stream.getAudioTracks();
        //   console.log('Got stream with constraints:', constraints);
        //   console.log('Using audio device: ' + audioTracks[0].label);
        //   stream.oninactive = function() {
        //     console.log('Stream ended');
        //   };
        //   window.stream = stream; // make variable available to browser console
        //   audio.srcObject = stream;
        // }
        
        // function handleError(error) {
        //   console.log('navigator.getUserMedia error: ', error);
        // }
        
        // navigator.mediaDevices.getUserMedia(constraints).
        //     then(handleSuccess).catch(handleError);




        let cmd = event.data.cmd
        let param = event.data.param

        chrome.runtime.sendMessage({
             cmd: cmd,
             param: param
        })
    })




})();
