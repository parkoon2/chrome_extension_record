const CaptureConfig = (function () {


    let capture = {
        enabled: false,
        video: {
            usage: true,
            width: 1920,
            height: 1080,
            framerate: 7
        },
        audio: {
            usage: true,
            echoCancellation: true, 
            noiseSuppression: true,
        },
        saveInfo: {
            userId: '',
            roomId: '',
        },
        timeslice: 1

    }

    function CaptureConfig () { }

    Object.defineProperties(CaptureConfig.prototype, {
        isVideo : { 
            get: function () { return capture.video.usage }
        },
        isAudio : { 
            get: function () { return capture.audio }
        },
        isEchoCancellation : { 
            get: function () { return capture.audio.echoCancellation }
        },
        isNoiseSuppression : { 
            get: function () { return capture.audio.noiseSuppression }
        },
        timeslice : { 
            get: function () { return capture.timeslice }
        },
        width : { 
            get: function () { return capture.video.width }
        },
        height : { 
            get: function () { return capture.video.height }
        },
        framerate : { 
            get: function () { return capture.video.framerate }
        },
        userId : { 
            get: function () { return capture.saveInfo.userId },
            set: function ( newVal ) { return capture.saveInfo.userId = newVal }
        },
        roomId : { 
            get: function () { return capture.saveInfo.roomId },
            set: function ( newVal ) { return capture.saveInfo.roomId = newVal }
            
        },
        enabled : { 
            get: function () { return capture.enabled },
            set: function ( newVal ) { return capture.enabled = newVal }
            
        }    
        
    })

    return CaptureConfig

})();