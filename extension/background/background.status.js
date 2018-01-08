let captureStatus = {
    enabled: false
}

chrome.browserAction.onClicked.addListener(function() {
    
    captureStatus.enabled = captureStatus.enabled ? false : true
    changeIcon( captureStatus.enabled )

    notifyToContentScripts({
        cmd: 'status:change',
        data: captureStatus.enabled
    })
})

chrome.tabs.onUpdated.addListener(function() {

    captureStatus.enabled = false
    changeIcon( captureStatus.enabled )
})

function changeIcon ( enabled ) {
    chrome.browserAction.setIcon({
        path: enabled ? '../images/record_on.png' : '../images/record_off.png'
    });

    chrome.browserAction.setTitle({
        title: enabled ? '녹화 가능' : '녹화 불가능'
    });
}
