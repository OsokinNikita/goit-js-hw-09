import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    faceCounter: document.querySelector('.timer'),
    daysCounter: document.querySelector('[data-days]'),
    hoursCounter: document.querySelector('[data-hours]'),
    minutesCounter: document.querySelector('[data-minutes]'),
    socondsCounter: document.querySelector('[data-seconds]'),
}

refs.startBtn.addEventListener('click', onStartBtnClick)

let deltaTime = null;
let timerId = null;

const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
            refs.startBtn.setAttribute('disabled', true)
        } else {
            refs.startBtn.removeAttribute('disabled')
        }
    },
}

addStyles ()
beforeStartCountdown ()

const pickr = new flatpickr('#datetime-picker', flatpickrOptions) 

function onStartBtnClick(evt){
   timerId = setInterval(() => {
        deltaTime = pickr.selectedDates[0] - new Date();
        if(deltaTime < 0) {
            clearInterval(timerId)
            refs.startBtn.setAttribute('disabled', true)
            Notiflix.Notify.success('The promotion has ended!!! Select the end date of the promotion to start a new countdown.');
            return
        }
        const time = convertMs(deltaTime);
        updateClockface(time)
    }, 1000)
}

function beforeStartCountdown () {
    refs.startBtn.setAttribute('disabled', true)
    Notiflix.Notify.success('Select the end date of the promotion, and press "Start" button!');
}

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    if (String(value).length <= 2 ) {
        return String(value).padStart(2, '0');
    } else {
        return String(value)
    }
  }
  
  function updateClockface({days , hours, minutes, seconds }) {
    refs.daysCounter.textContent = `${days}`;
    refs.hoursCounter.textContent = `${hours}`;
    refs.minutesCounter.textContent = `${minutes}`;
    refs.socondsCounter.textContent = `${seconds}`;
  }

  function addStyles () {
    refs.faceCounter.style.display = 'flex'
    refs.faceCounter.style.gap = `${15}px`
    refs.faceCounter.style.marginTop = `${15}px`
    refs.daysCounter.style.display = 'flex'
    refs.daysCounter.style.justifyContent = 'center'
    refs.daysCounter.style.border = `solid`
    refs.daysCounter.style.minWidth = `${70}px`
    refs.hoursCounter.style.display = 'flex'
    refs.hoursCounter.style.justifyContent = 'center'
    refs.hoursCounter.style.border = `solid`
    refs.hoursCounter.style.minWidth = `${70}px`
    refs.minutesCounter.style.display = 'flex'
    refs.minutesCounter.style.justifyContent = 'center'
    refs.minutesCounter.style.border = `solid`
    refs.minutesCounter.style.minWidth = `${70}px`
    refs.socondsCounter.style.display = 'flex'
    refs.socondsCounter.style.justifyContent = 'center'
    refs.socondsCounter.style.border = `solid`
    refs.socondsCounter.style.minWidth = `${70}px`
  }
