const TabCapturer = (function () {

    let recorder, recordedChunks

    function TabCapturer () { }
    
    TabCapturer.prototype.start = function ( option ) {
        return new Promise( function (resolve, reject) {
            //console.log('option', option)
            const constraints = {
                video: option.isVideo ? true : false,
                audio: option.isAudio ? true : false, 
            };
            
            if ( option.isVideo ) {
                constraints.videoConstraints = {
                    mandatory: {
                        chromeMediaSource: 'tab',
                        maxWidth: option.resolution.width,
                        maxHeight: option.resolution.height,
                        minWidth: option.resolution.width,
                        minHeight: option.resolution.height,
                        maxFrameRate: option.framerate,
                        minFrameRate: option.framerate - 2
                      } 
                }
            }
            if ( option.isAudio ) {
                constraints.audioConstraints = {
                    mandatory: {
                        chromeMediaSource: 'tab',
                        echoCancellation: option.echoCancellation
                      }
                }
            }
            console.log('constraints', constraints)

            chrome.tabs.query( { active : true }, function ( tab ) {
                chrome.tabCapture.capture( constraints, captureHandler );
            });

            function captureHandler ( stream ) {
                
                recordedChunks = []
                recorder = new MediaRecorder( stream )
                recorder.ondataavailable = function ( event ) {
                    console.log('video data', event.data)
                    if ( event.data.size > 0 ) recordedChunks.push( event.data );
                }
                recorder.start( option.timeslice * 1000 ) // timeslice
            
                resolve( stream );
                    
            }
        })
    }

    TabCapturer.prototype.stop = function () {
        return new Promise( function (resolve, reject) {
            var blob = new Blob(recordedChunks, {type: 'video/webm'});

            clearTracks();
            recorder.stop()
            resolve( blob ) 
        })
    }

    function clearTracks () {
        recorder.stream.getTracks().forEach( function( track ) {
            track.stop()
        })
    }       

    return TabCapturer;
})()
