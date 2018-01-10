const startButton = document.querySelector('#start')
const endtButton = document.querySelector('#end')
//const pauseButton = document.querySelector('#pause')
const videoSwitch = document.querySelector('#videoSwitch')
const audioSwitch = document.querySelector('#audioSwitch')

const capture = new Capture();
const captureConfig = new CaptureConfig();

startButton.addEventListener('click', startHandler)
endtButton.addEventListener('click', stopHandler)

capture.on( 'recordDone', function (event) {
    console.log('recordDone', event.detail, 'DB에 넣자넣어~')
    let recordInfo = {
        'eventOp' : 'Record',
        'filepath': event.detail.filepath,
        'roomId'  : captureConfig.roomId,
        'userId'  : captureConfig.userId,
    }
    console.log('recordInfo', recordInfo)
    captureConfig.userId = ''
    captureConfig.roomId = ''
})


capture.on( 'captureStatus', function (event) {
    console.log( 'captureStatus', event.detail.status )
    captureConfig.enabled = event.detail.status
})
function startHandler () {

    if ( !captureConfig.enabled ) {
        return
    }

    console.log({
        video           : captureConfig.isVideo,
        audio           : captureConfig.isAudio,
        echoCancellation: captureConfig.isEchoCancellation,
        noiseSuppression: captureConfig.isNoiseSuppression,
        timeslice       : captureConfig.timeslice,
        width           : captureConfig.width,
        height          : captureConfig.height,
        framerate       : captureConfig.framerate,
    })
    
    capture.start({
        video           : captureConfig.isVideo,
        audio           : captureConfig.isAudio,
        echoCancellation: captureConfig.isEchoCancellation,
        noiseSuppression: captureConfig.isNoiseSuppression,
        timeslice       : captureConfig.timeslice,
        width           : captureConfig.width,
        height          : captureConfig.height,
        framerate       : captureConfig.framerate,
    });
}
function stopHandler () {
    console.log('stopHandler')

    let userId ='ctest1'
    let roomId ='roomteset1'
    let url = '/record/upload/' + userId
    let filedname = 'record'


    captureConfig.userId = 'ctest1'
    captureConfig.roomId = 'roomteset1'

    capture.stop({
        video : captureConfig.isVideo,
        audio : captureConfig.isAudio,
        filename: roomId,
        url: url,
        filedname: filedname
    })

}

function pauseHandler () {
    console.log('pauseHandler')
}
