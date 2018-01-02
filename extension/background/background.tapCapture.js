const TapCapture = (function () {

    function TapCapture () {
        this.recorder = null
        this.recordedChunks = null
        this.videoPlayers = null
    }
    
    TapCapture.prototype.do = function ( option ) {

        const constraints = {
            video: option.isVideo ? true : false,
            audio: option.isAudio ? true : false, 
        };

        let self = this;

        return new Promise( function (resolve, reject) {

            if ( option.isVideo ) {
                constraints.videoConstraints = {
                    mandatory: {
                        // providing max resolution improves quality
                        chromeMediaSource: 'tab',
                        // maxWidth: 1920,
                        // maxHeight: 1080,
                        maxWidth: 720,
                        maxHeight: 480,
                        // maxWidth: 1280,
                        // maxHeight: 720,
                      } 
                }
            }
            if ( option.isAudio ) {
                constraints.audioConstraints = {
                    mandatory: {
                        chromeMediaSource: 'tab',
                        echoCancellation: true
                      }
                }
            }
            

            chrome.tabs.query( { active : true }, function ( tab ) {
                chrome.tabCapture.capture(constraints, captureHandler);
            });



            function captureHandler (stream) {
                console.log('captureHandler', stream)


                // navigator.webkitGetUserMedia({audio: true, video: false}, function() {
                //     console.log('ok : in background');
                // }, function(e) {
                //     console.log('webcam not ok in background');
                // });

                startVideoPlayer( stream )

                self.recordedChunks = []
                self.recorder = new MediaRecorder( stream )
                self.recorder.ondataavailable = function ( event ) {
                    if ( event.data.size > 0 ) self.recordedChunks.push( event.data );
                }
                self.recorder.start(7 * 1000) // timeslice

                resolve();
            
            }

        })
    }

    TapCapture.prototype.done = function () {
        let self = this;
        return new Promise( function (resolve, reject) {
            console.log('stop!', self.recorder)

            self.recorder.stream.getTracks().forEach( function( track ) {
                track.stop()
            })
            self.recorder.stop()

            videoPlayers.forEach( function (player) {
                player.src = null;
            })
            videoPlayers = []
            
            console.log('Recorded Blobs: ', self.recordedChunks);
            var blob = new Blob(self.recordedChunks, {type: 'video/webm'});

            

            //var blob = new Blob(recordedChunks, {type: 'audio/webm'});
            console.log('fetch???!!!!!!!!!!!!', fetch)
        
            var formData = new FormData();
           formData.append('upl', blob, 'zzzzzzzzzzzzzzzzzzzzzzzz.webm');
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









            // var url = window.URL.createObjectURL(blob);
            // var a = document.createElement('a');
            // a.style.display = 'none';
            // console.log(url)
            // a.href = url;
            // a.download = 'test.webm';
            // document.body.appendChild(a);
            // a.click();
            // setTimeout(function() {
            //   document.body.removeChild(a);
            //   window.URL.revokeObjectURL(url);
            // }, 100);
        })
    }

    return TapCapture;
})()




// 소리 안나오는거 해결...

function initVideoPlayer(stream) {
    //videoPlayers = []
        console.log('눠ㅛㅣ핰/', document)
        // var videoPlayer = document.createElement('video');
        // videoPlayer.muted = !enableTabCaptureAPI;
        // videoPlayer.volume = !!enableTabCaptureAPI;
        // videoPlayer.src = URL.createObjectURL(stream);
    
        // videoPlayer.play();
    
        // videoPlayers.push(videoPlayer);
}

// 끌 때!
// try {
//     videoPlayers.forEach(function(player) {
//         player.src = null;
//     });
//     videoPlayers = [];
// } catch (e) {}
    