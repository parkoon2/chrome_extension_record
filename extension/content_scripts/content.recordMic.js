const MicRecorder = (function () {

    let recorder, recordedChunks ;
    
    function MicRecorder () { }

    MicRecorder.prototype.start = function ( option ) {
        console.log('>>>>>>>>>> MIC CAPTURE START <<<<<<<<<<') 
        
        const constraints = {
            video: false,
            audio: { 
                echoCancellation: option.echoCancellation || true, 
                noiseSuppression: option.noiseSuppression || true
            }
        }

        navigator.webkitGetUserMedia( constraints , function (stream) {
            
            recordedChunks = []
            
            recorder = new MediaRecorder( stream )
            recorder.ondataavailable = function ( event ) {
                if ( event.data.size > 0 ) recordedChunks.push( event.data );
            }
            recorder.start( option.timeslice * 1000 ) 
    
        }, function( err ) {
            console.log( err );
        });
    }

    MicRecorder.prototype.stop = function () {
        return new Promise( function (resolve, reject) {
            console.log('>>>>>>>>>> MIC CAPTURE END <<<<<<<<<<')
            try {
                let blob = new Blob( recordedChunks, { type: 'audio/webm' });
                clearTrack()
                recorder.stop()
                resolve( blob )
            } catch ( err ) {
               reject( err )
            }
        })
    }

    function clearTrack () {
        recorder.stream.getTracks().forEach( function( track ) {
            track.stop()
        })
    }
    return MicRecorder

})();
