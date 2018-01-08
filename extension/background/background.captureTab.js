const TabCapturer = (function () {

    let recorder, recordedChunks

    function TabCapturer () { }
    
    TabCapturer.prototype.start = function ( option ) {
        return new Promise( function (resolve, reject) {
            
            const constraints = {
                video: option.isVideo ? true : false,
                audio: option.isAudio ? true : false, 
            };
            
            if ( option.isVideo ) {
                constraints.videoConstraints = {
                    mandatory: {
                        chromeMediaSource: 'tab',
                        maxWidth: option.width,
                        maxHeight: option.height,
                        minWidth: option.width,
                        minHeight: option.height,
                        maxFrameRate: option.framrate,
                        minFrameRate: option.framrate - 2
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
    