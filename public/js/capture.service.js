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
    
        Capture.prototype.start = function ( config ) {
            this.sendMessage('capture:start', config)
        }

        Capture.prototype.stop = function ( config ) {
            this.sendMessage('capture:stop', config)
        }
    
    
        Capture.prototype.status = function () {
           this.sendMessage('capture:status')
        }
    
        return Capture;
    })();