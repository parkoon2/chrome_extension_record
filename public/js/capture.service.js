const Capture = (function () {
    
        // constructor
        function Capture () {
        }
    
        Capture.prototype.sendMessage = function (args) {
            // message, targetOrigin, [transfer]);
            
            let cmd   = arguments[0];
            let param = arguments.length === 2 ? arguments[1] : null
    
            window.postMessage({
                cmd: cmd,
                param : param
            }, location.origin)
        }
    
        Capture.prototype.start = function ( option ) {
            console.log('!!!!!!!', option)
            this.sendMessage('capture:start', option)
        }

        Capture.prototype.stop = function ( option ) {
            this.sendMessage('capture:stop', option)
        }
    
    
        Capture.prototype.status = function () {
           this.sendMessage('capture:status')
        }
    
        return Capture;
    })();