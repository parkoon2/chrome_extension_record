const Common = (function () {
    
    function Common () {}

    Common.prototype.notifyToContentScripts = function ( message ) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        });
    }

    Common.prototype.changeIcon = function ( enabled, tabId ) {
        chrome.browserAction.setIcon({
            path: enabled ? '../images/record_on.png' : '../images/record_off.png',
            tabId: tabId
        });
    
        chrome.browserAction.setTitle({
            title: enabled ? '녹화 가능' : '녹화 불가능',
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