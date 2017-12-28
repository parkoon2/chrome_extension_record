const start =  document.querySelector('#start')
const data = 'capture:start'

//console.log(data)

start.addEventListener('click', handleRecordStart)

function handleRecordStart (event) {
    event.preventDefault();
    window.postMessage({data: 'capture:start'}, '*');
}

