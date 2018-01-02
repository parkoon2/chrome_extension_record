console.log('content.captureMic.js')
let recorder, recordedChunks ;

function captureStart () {
    // https://addpipe.com/blog/audio-constraints-getusermedia/
    navigator.webkitGetUserMedia( { audio: { echoCancellation: true , noiseSuppression: true}, video: false } , function(stream) {
        recordedChunks = []
        console.log('ok : in content', stream, document);
        recorder = new MediaRecorder( stream )
        recorder.ondataavailable = function ( event ) {
            if ( event.data.size > 0 )  { // 얼마이상을 해야 안잘릴까?
                console.log('audio data', event.data)
                recordedChunks.push( event.data );
            }
        }
        recorder.start(0.01 * 1000) // timeslice

    }, function(e) {
        console.log('webcam not ok in content');
    });
}

function captureStop () {
    console.log('stop!', self.recorder)
    
    recorder.stream.getTracks().forEach( function( track ) {
        track.stop()
    })
    recorder.stop()


    
    console.log('Recorded Blobs: ', recordedChunks);

    var blob = new Blob(recordedChunks, {type: 'audio/webm'});
    console.log('fetch???', fetch)

    var fd = new FormData();
    fd.append('upl', blob, 'blobby111.webm');

    fetch('/api/test',
      {
        method: 'post',
        body: fd
      })
    .then(function(response) {
      console.log('done');
      return response;
    })
    .catch(function(err){ 
      console.log(err);
    });



    // var url = window.URL.createObjectURL(blob);
    // var a = document.createElement('a');
    // a.style.display = 'none';
    // console.log(url)
    // a.href = url;
    // a.download = 'audio.webm';
    // document.body.appendChild(a);
    // a.click();
    // setTimeout(function() {
    //   document.body.removeChild(a);
    //   window.URL.revokeObjectURL(url);
    // }, 100);
}
