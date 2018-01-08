const Capture = (function () {
    
        // constructor
        function Capture () {
        }
    
        Capture.prototype.sendMessage = function ( args ) {
            // message, targetOrigin, [transfer]);
            
            let cmd   = arguments[0];
            let param = arguments.length === 2 ? arguments[1] : null
    
            window.postMessage({
                cmd   : cmd,
                param : param
            }, location.origin)
        }
    
        Capture.prototype.start = function ( option ) {
            if ( !option ) option = {}
            this.sendMessage( 'capture:start', option )
        }

        Capture.prototype.stop = function ( option ) {
            if ( !option ) option = {}
            this.sendMessage('capture:stop', option)
        }
    
    
        Capture.prototype.status = function () {
           this.sendMessage('capture:status')
        }

        Capture.prototype.on = function (eventName, handler) {
            window.addEventListener( eventName, function (event) {
                handler( event )
            })
         }
    
        return Capture;
    })();