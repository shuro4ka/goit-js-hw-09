import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dataInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

const isDisabled = true;
refs.startBtn.disabled = isDisabled;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  dateCheck(selectedDates[0]);
  }
};

const timePicker = flatpickr(refs.dataInput, options);
  
function dateCheck (date){
    const currentDate = new Date();
    if(currentDate > date) {
      Notify.failure("Please choose the date in the future");
    } else {
      refs.startBtn.disabled = !isDisabled;
    }
}

console.log(timePicker.selectedDates[0]);
refs.startBtn.addEventListener('click', onStart);

function onStart() {
    refs.startBtn.disabled = isDisabled;
    refs.dataInput.disabled = isDisabled;
    countDown();
}

function countDown () {
    intervalID = setInterval(() =>{
    const diff = timePicker.selectedDates[0] - Date.now();
    const convertedTime = convertMs(timePicker.selectedDates[0] - Date.now());
    console.log(convertedTime);
    updateTimeValues(convertedTime);
    if(diff < 1000){
      clearInterval(intervalID);
      Notify.success('Time is up! Timer has just stopped! Time is over!')
   }
  }, 1000)
} 

function addZero(value){
  return String(value).padStart(2, "0");
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimeValues({ days, hours, minutes, seconds }) {
  refs.days.textContent = addZero(days);
  refs.hours.textContent = addZero(hours);
  refs.minutes.textContent = addZero(minutes);
  refs.seconds.textContent = addZero(seconds);
};