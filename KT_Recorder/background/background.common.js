const Common = (function () {
    
    function Common () {}

    Common.prototype.notifyToContentScripts = function ( message ) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }

    Common.prototype.changeIcon = function ( enabled, tabId ) {
        chrome.browserAction.setIcon({
            path: '../images/record_on.png',
            tabId: tabId
        });
    
        chrome.browserAction.setTitle({
            title: '녹화 가능',
            tabId: tabId
        });
    }

    Common.prototype.getCurrentTabId = function ( callback ) {
        chrome.tabs.query( {active: true, currentWindow: true}, function (tabs) {
            callback( tabs[0].id );
        });
    }

    return Common
})()