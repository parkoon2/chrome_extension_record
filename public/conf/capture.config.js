const Config = (function () {


    let record = {
        video: true,
        audio: false
    }

    function Config () { }

    Object.defineProperties(Config.prototype, {
        videoRecord : { 
            set: function ( newVal ) { record.video = newVal },
            get: function () { return record.video }
        },
        audioRecord : { 
            set: function ( newVal ) { record.audio = newVal },
            get: function () { return record.audio }
        },
    })

    return Config

})();