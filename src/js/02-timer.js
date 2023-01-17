import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  faceCounter: document.querySelector('.timer'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minutesCounter: document.querySelector('[data-minutes]'),
  socondsCounter: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);

let possibleTime = null;
let idTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

addStyles();
beforeStartCountdown();

const pickr = new flatpickr('#datetime-picker', options);

function onStartBtnClick(evt) {
  idTimer = setInterval(() => {
    possibleTime = pickr.selectedDates[0] - new Date();
    if (possibleTime < 0) {
      clearInterval(idTimer);
      refs.startBtn.setAttribute('disabled', true);
      Notiflix.Notify.success(
        'The promotion has ended!!! Select the end date of the promotion to start a new countdown.'
      );
      return;
    }
    const times = convertMs(possibleTime);
    updateClockface(times);
  }, 1000);
}

function beforeStartCountdown() {
  refs.startBtn.setAttribute('disabled', true);
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
  if (String(value).length <= 2) {
    return String(value).padStart(2, '0');
  } else {
    return String(value);
  }
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysCounter.textContent = `${days}`;
  refs.hoursCounter.textContent = `${hours}`;
  refs.minutesCounter.textContent = `${minutes}`;
  refs.socondsCounter.textContent = `${seconds}`;
}

function addStyles() {
  // refs.daysCounter.style.cssText = "display: flex; justifyContent: center; border: solid; ";
  // refs.hoursCounter.style.cssText = "display: flex; justifyContent: center; border: solid; width: 110px;";
  // refs.minutesCounter.style.cssText = "display: flex; justifyContent: center; border: solid; width: 110px;";
  // refs.socondsCounter.style.cssText = "display: flex; justifyContent: center; border: solid; width: 110px;";
}
