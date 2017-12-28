

// Web <---> Content scripts
(function() {
    'use strict'

    let namespace = 'capture'

    console.log('content:signaling')


    chrome.runtime.onMessage.addListener(function (message) {
        
        console.log('result in content scripts', message, location.origin)
    });
    
    window.addEventListener('message', function(event) {
        console.log(event.data)
        let cmd = event.data.cmd
        let param = event.data.param

        chrome.runtime.sendMessage({
             cmd: cmd,
             param: param
        })
    })




})();
