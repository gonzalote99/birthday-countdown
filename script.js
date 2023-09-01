'use-strict';

const happyContainer = document.querySelector('.happy__content');
const countdownContainer = document.querySelector('.countdown__content');
const settingIcon = document.querySelector('.setting-icon');
const subline = document.querySelector('.subline h2');
const modalbox = document.querySelector('.content-modalbox');
const birthdayInput = document.querySelector('.birthday__input');
const submitBtn = document.querySelector('.submit-btn__input--style');
const day = document.querySelector('.days');
const hour = document.querySelector('.hours');
const minute = document.querySelector('.minutes');
const second = document.querySelector('.seconds');

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]

const d = new Date();
const oneYearFromNow = new Date(d.setFullYear(d.getFullYear() + 1));

let birthday = '';

checkPastOrFuture('20', 'March')

function submitDate(e) {
  let year, str;

  if(birthdayInput.value !== '') {
    str = birthdayInput.value.split(' ');
    if(isNaN(str[0] - 0) && str[0] > 31) {
      alert('insert correct');
      return;

    } else if(!months.includes(str[1].toLowerCase())) {
      alert('insert correct month');
      return;
    }
  } else {
    alert('insert date');
    return;
  }

  checkPastOrFuture(str[0], str[1]);

  modalbox.style.display = 'none';

  console.log(`this is ${birthday}`);
}


modalbox.addEventListener('keyup', e => {
if(e.key === 'Enter') {
  submitDate();
}

console.log(e.key);

})
submitBtn.addEventListener('click', submitDate);


let distanceOfTime;

let interval = setInterval(() => {
  const date = new Date(birthday),
  seconds = 1000,
  minutes = seconds * 60,
  hours = minutes * 60,
  days = hours * 24;

  let countDown = date.getTime();
  let now = new Date().getTime();

  distanceOfTime = countDown - now;

  day.textContent = Math.floor(distanceOfTime / (days))
  hour.textContent = Math.floor((distanceOfTime % (days)) / (hours));
  minute.textContent = Math.floor((distanceOfTime % (hours)) / (minutes));
  second.textContent = Math.floor((distanceOfTime % (minutes)) / (seconds));


  if(distanceOfTime < 0) {
    countdownContainer.style.display = 'none';
    happyContainer.style.display = 'block';
  } else {
    countdownContainer.style.display = 'block';
    happyContainer.style.display = 'none';
  }

}, 0);


settingIcon.addEventListener('click', () => {
  const styleModalbox = getComputedStyle(modalbox);
(styleModalbox.display === 'none' ) ? modalbox.style.display = 'flex' : modalbox.style.display = 'none';

birthdayInput.focus();

}
)


function checkPastOrFuture(date, month, year) {
  const data = new Date(date + ' ' + month + ' ' + new Date().getFullYear()).setHours(0, 0, 0, 0);

  const now = new Date().setHours(0, 0, 0, 0);

  const lastDateInThisYear = new Date('31 December' + new Date().getFullYear());

  console.log(date + ' ' + month + ' ' + new Date().getFullYear())
  console.log(new Date(date + ' ' + month + ' ' + new Date().getFullYear()))

  if(data < now) {
    console.log('past');
    birthday = `${date} ${month} ${oneYearFromNow.getFullYear()} 00:00:00`;
    subline.textContent = `from this day until ${date} ${month} ${oneYearFromNow.getFullYear()}`;
  } else if(data <= lastDateInThisYear) {
    console.log('___');
    console.log('no until last date')
    birthday = `${date} ${month} ${new Date().getFullYear()} 00:00:00`;
    subline.textContent = `from this day until ${date} ${month} ${new Date().getFullYear()}`;
  }
}