console.log('content.captureMic.js')

const MicRecorder = (function () {

    let recorder, recordedChunks ;
    
    function MicRecorder () { }

    MicRecorder.prototype.start = function ( option ) {
        console.log('MIC CAPTURE START')
        // https://addpipe.com/blog/audio-constraints-getusermedia/
        const constraints = {
            video: false,
            audio: { 
                echoCancellation: option.echoCancellation || true, 
                noiseSuppression: option.echoCancellation || true
            }
        }

        navigator.webkitGetUserMedia( constraints , function (stream) {
            
            recordedChunks = []
            
            recorder = new MediaRecorder( stream )
            recorder.ondataavailable = function ( event ) {
                if ( event.data.size > 0 )  { // 얼마이상을 해야 안잘릴까?
                    console.log('audio data', event.data)
                    recordedChunks.push( event.data );
                }
            }
            recorder.start( option.timeslice * 1000 ) // timeslice
    
        }, function( err ) {
            console.log('webcam not ok in content', err);
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
    
    
    
    
    
    
    
    
       //formData.append('name', 'zero')
        // fetch('/record/upload',
        //   {
        //     method: 'post',
        //     body: formData,
        //     headers: new Headers()
        //   })
        // .then(function(res) {
        //     console.log('???')
        //     if (res.status === 200 || res.status === 201) {
        //         res.json().then(json => console.log(json));
        //       } else {
        //         console.error(res.statusText);
        //     }
        //   return res;
        // })
        // .catch(function(err){ 
        //   console.log(err);
        // });
    console.log('zzzzzzzzzzzzzzzsdasdasdasdasdsdfgsdg')
      
    
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
    
    
    
    
            
    //     var xhr = new XMLHttpRequest();
    // var formData = new FormData();
    // formData.append('name', 'zerocho');
    // formData.append('birth', 1994);
    // xhr.onload = function() {
    //   if (xhr.status === 200 || xhr.status === 201) {
    //     console.log(xhr.responseText);
    //   } else {
    //     console.error(xhr.responseText);
    //   }
    // };
    // xhr.open('POST', 'https://www.zerocho.com/api/post/formdata');
    // xhr.send(formData); // 폼 데이터 객체 전송
    
    
    
        // const url = 'https://randomuser.me/api';
        // // The data we are going to send in our request
        // let data = {
        //     name: 'Sara'
        // }
        // // The parameters we are gonna pass to the fetch function
        // let fetchData = { 
        //     method: 'POST', 
        //     body: data,
        //     headers: new Headers()
        // }
        // fetch(url, fetchData)
        // .then(function() {
        //     // Handle response you get from the server
        // });
    
    
    
    
    
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
