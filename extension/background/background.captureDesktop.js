// 수정필요..

var dataSources = ['screen', 'window'];
var desktopMediaRequestId = '';

chrome.runtime.onConnect.addListener(function(port) {
  console.log("onConnect!!!");
  port.onMessage.addListener(function(msg) {
	  console.log("port : ", msg);
    if (msg.type === 'SS_UI_REQUEST') {
      requestScreenSharing(port, msg);
    }

    if (msg.type === 'SS_UI_CANCEL') {
      cancelScreenSharing(msg);
    }
  });
});

chrome.runtime.onMessage.addListener(function(message) {
	console.log("onMessage : ", message);
});

function requestScreenSharing(port, msg) {
  // https://developer.chrome.com/extensions/desktopCapture
  // params:
  //  - 'dataSources' Set of sources that should be shown to the user.
  //  - 'targetTab' Tab for which the stream is created.
  //  - 'streamId' String that can be passed to getUserMedia() API
  console.log("requestScreenSharing", msg);
  desktopMediaRequestId =
      chrome.desktopCapture.chooseDesktopMedia(dataSources, port.sender.tab,
          function(streamId) {
            if (streamId) {
              msg.type = 'SS_DIALOG_SUCCESS';
              msg.streamId = streamId;
            } else {
              msg.type = 'SS_DIALOG_CANCEL';
            }
            port.postMessage(msg);
          });
}

function cancelScreenSharing() {
	console.log("cancelScreenSharing");
	if (desktopMediaRequestId) {
    chrome.desktopCapture.cancelChooseDesktopMedia(desktopMediaRequestId);
  }
}
