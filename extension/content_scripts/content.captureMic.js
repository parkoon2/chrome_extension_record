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


    /*
    console.log('Recorded Blobs: ', recordedChunks);

    var blob = new Blob(recordedChunks, {type: 'audio/webm'});
    console.log('fetch???!!!!!!!!!!!!', fetch)

    var formData = new FormData();
   formData.append('upl', blob, 'blobby111.webm');



*/




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

    /*

    var xhr = new XMLHttpRequest(); 
    xhr.onload = function() {
        console.log('xzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
        if (xhr.status === 200 || xhr.status === 201) {
           // console.log(xhr.responseText);
        } else {
            //console.error(xhr.responseText);
        }
    };
    xhr.open('POST', 'http://localhost:7777/record/upload');
    xhr.send(formData); // 폼 데이터 객체 전송

*/


        
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
