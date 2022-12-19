function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}
refs.body.addEventListener('click', onBtnClick)
// refs.startBtn.addEventListener('click', onStartBtnClick);
// refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.setAttribute('disabled', true)
let timerId = null;

function onBtnClick(evt) {
    if(evt.target.hasAttribute('data-start')) {
        onStartBtnClick(evt)
    }
    if(evt.target.hasAttribute('data-stop')) {
        onStopBtnClick(evt)
    }
}

function onStartBtnClick(evt) {
    refs.stopBtn.removeAttribute('disabled')
    refs.startBtn.setAttribute('disabled', true)
    
    let currentColor = getRandomHexColor();
    refs.body.style.backgroundColor = currentColor;
    timerId = setInterval(()=>{
        currentColor = getRandomHexColor();
        refs.body.style.backgroundColor = currentColor;
    }, 1000);
}

function onStopBtnClick(evt) {
    refs.startBtn.removeAttribute('disabled')
    refs.stopBtn.setAttribute('disabled', true)
    clearInterval(timerId)
    refs.body.style.backgroundColor = 'white';
}