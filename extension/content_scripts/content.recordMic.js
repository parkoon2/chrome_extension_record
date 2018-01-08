const MicRecorder = (function () {

    let recorder, recordedChunks ;
    
    function MicRecorder () { }

    MicRecorder.prototype.start = function ( option ) {
        console.log('MIC CAPTURE START') // https://addpipe.com/blog/audio-constraints-getusermedia/
        
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
                console.log('audio data', event.data)
                if ( event.data.size > 0 ) recordedChunks.push( event.data );
            }
            recorder.start( option.timeslice * 1000 ) 
    
        }, function( err ) {
            console.log( err );
        });
    }

    MicRecorder.prototype.stop = function () {
        console.log('MIC CAPTURE STOP')
        return new Promise( function (resolve, reject) {
            let blob = new Blob( recordedChunks, { type: 'audio/webm' });
            clearTrack()
            recorder.stop()
            resolve( blob )
        })

    
    
        
        console.log('fetch???!!!!!!!!!!!!', fetch)
    
        var formData = new FormData();
        formData.append('record', blob, 'blobby111.webm');
 
    
        var xhr = new XMLHttpRequest(); 
        xhr.onload = function() {
            console.log('xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
            if (xhr.status === 200 || xhr.status === 201) {
               // console.log(xhr.responseText);
            } else {
                //console.error(xhr.responseText);
            }
        };
        xhr.open('POST', 'http://localhost:7777/record/upload/hahahahahahah');
        xhr.send(formData); // 폼 데이터 객체 전송

    }

    function clearTrack () {
        recorder.stream.getTracks().forEach( function( track ) {
            track.stop()
        })
    }


    return MicRecorder

})();

function captureStart () {

}

function captureStop () {
   
}
