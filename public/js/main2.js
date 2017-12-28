const Record = ( function () {


    const video = document.createElement( 'video' );
    
    let recorder;

    function Record () {
        console.log( 'constructor' );
        let self = this;

        recorder = null;

        document.addEventListener( 'keyup', function ( event ) {

            switch ( event.keyCode ) {
                case 27 /* esc */ :
                self.stop();    
                break;
            }  
        }); 

    }


    Record.prototype = {
        start: function () {
            console.log( 'start' );


            navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
                console.log('stream', stream);
            }, function(e) {
                console.log('webcam not ok');
            });
      




            getCameraStream().then( function ( cameraStream ) {
                appendVideo( cameraStream )
                getWindowStream().then( function ( windowStream ) {

                    //const finalStream = new MediaStream();

                    
                    // const videoTrack = windowStream.getVideoTracks()[0];
                    // finalStream.addTrack(videoTrack);
                    // const audioTrack = cameraStream.getAudioTracks()[0];
                    // finalStream.addTrack(audioTrack);
                    try {
                        recorder = new MediaRecorder(windowStream, {mimeType: 'video/webm;codecs=vp8'});
                      } catch (e) {
                        console.error('Exception while creating MediaRecorder: ' + e);
                        alert('Exception while creating MediaRecorder: '
                          + e + '. mimeType: ' + options.mimeType);
                        return;
                      }


                    // try {
                    //     recorder = new MediaRecorder(windowStream, {mimeType: 'video/webm;codecs=vp8'});
                    //     console.log('recorder')
                    //   } catch (e) {
                    //     console.error('Exception while creating MediaRecorder: ' + e);
                    //     alert('Exception while creating MediaRecorder: '
                    //       + e + '. mimeType: ' + options.mimeType);
                    //     return;
                    //   }

                   
                    recorder.start();
                    recorder.ondataavailable = function(e) {
                        console.log('ondataavailable');
                        const link = document.createElement('a');
                        link.setAttribute('href', window.URL.createObjectURL(e.data));
                        link.setAttribute('download', 'video_' + Math.floor((Math.random() * 999999)) + '.webm');
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    console.log('시핮ㄱ한다...')
                    
                })
            })
        },
        
        stop: function () {
            console.log( 'stop' );
        }
    }


    const getWindowStream = function () {
        return new Promise( function (resolve, reject) {
            navigator.mediaDevices.getUserMedia( {
                video: {
                    mediaSource: 'window'
                }
            }).then( function ( stream ) {
                resolve( stream )
            }).catch( function ( err ) {
                reject( err )
            });
        })
    }




    const getCameraStream = function () {
        return new Promise( function (resolve, reject) {
            navigator.mediaDevices.getUserMedia( {
                video: true,
                audio: true
            }).then( function ( stream ) {
                resolve( stream )
            }).catch( function ( err ) {
                reject( err )
            });
        })
    }
    
    

    const appendVideo = function ( stream ) {
        document.body.appendChild( video );
        console.log( URL.createObjectURL( stream ) )
        video.src = URL.createObjectURL( stream );
        video.style.height = '200px'
        video.style.width = '200px'
        video.volume = 0;
        video.play();
    }

    return Record;
})();