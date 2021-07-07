"use strict";
const calendars = document.querySelectorAll('.calendar');
const prev = document.querySelector('.prev-btn');
const next = document.querySelector('.next-btn');
const slider = document.querySelector('.slider');
const daysList = document.querySelectorAll('.days');
const months = document.querySelectorAll('.month');
const firstMonth = document.querySelectorAll('.calendar .month-1');
const secondMonth = document.querySelectorAll('.calendar .month-2');
const gridDaysOne = document.querySelectorAll('.calendar .grid-day-1');
const gridDaysTwo = document.querySelectorAll('.calendar .grid-day-2');
const checkIn = document.querySelector('#check-in-date');
const checkOut = document.querySelector('#check-out-date');
const smallCalCheckIn = document.querySelector('#sm-cal-check-in');
const smallCalCheckOut = document.querySelector('#sm-cal-check-out');
const smallCalLabel = document.querySelectorAll('.sm-form-label');
const clearCalendar = document.querySelector('.cal-clear');
const continueBox = document.querySelector('.continue-box');
const continueBtn = document.querySelector('.cont-btn');
const no_of_nights = document.querySelectorAll('.no-of-nights');
const angle = 360 / calendars.length;
let checkInValue;
let checkOutValue;
let d = new Date();
let n = d.getMonth();
let y = d.getFullYear();
let todayDate = d.getDate();
let e = new Date();
e.setDate(e.getDate() + 1);
let p = e.getMonth();
let z = e.getFullYear();
let tmrDate = e.getDate();
function getDateValues(year, month, day) {
    let a;
    let b;
    day < 10 ? (a = `0${day}`) : (a = `${day}`);
    month < 10 ? (b = `0${month + 1}`) : (b = `${month + 1}`);
    return `${y}-${b}-${a}`;
}
let todayValue = getDateValues(y, n, todayDate);
let tmrValue = getDateValues(z, p, tmrDate);
let nxtDayValue;
let x = 0;
let click = 0;
let count = 0;
// generateMonths
function getMonth(month, index, monthIndex, gridDay) {
    let monthNum = n + index + monthIndex;
    let date = new Date(y, monthNum);
    let monthNumeric = date.getMonth();
    let options = { month: 'long', year: 'numeric' };
    let monthText = date.toLocaleString('en-us', options);
    month.textContent = monthText;
    gridDay.innerHTML = '';
    let days = new Date(y, monthNum + 1, 0).getDate();
    let weekDay = new Date(y, monthNum).getDay() + 1;
    for (let i = 1; i <= days; i++) {
        let day = document.createElement('p');
        day.textContent = i.toString();
        day.classList.add('day');
        let m = monthNumeric + 1;
        let year = monthText.replace(/\D/g, '');
        let dateChecker = new Date(`${year}/${m}/${i + 1}`);
        let dayDate = new Date(`${year}/${m}/${i}`);
        let stringOptions = {
            month: 'short',
            year: 'numeric',
            weekday: 'short',
            day: '2-digit',
        };
        let dateString = dayDate.toLocaleString('en-us', stringOptions);
        d > dateChecker && day.classList.add('past-day');
        let dataDay;
        let nextDay;
        let dataMonth;
        i < 10 ? (dataDay = `0${i}`) : (dataDay = `${i}`);
        i < 10 ? (nextDay = `0${i + 1}`) : (nextDay = `${i + 1}`);
        m < 10 ? (dataMonth = `0${m}`) : (dataMonth = `${m}`);
        let dateValue = `${year}-${dataMonth}-${dataDay}`;
        let nextDayValue = `${year}-${dataMonth}-${nextDay}`;
        getBookingDate(day, dateString, dateValue, nextDayValue);
        markDays(day, dateValue);
        day.dataset.date = dateValue;
        gridDay.appendChild(day);
        let grid = `${weekDay}/${weekDay + 1}`;
        let firstDay = gridDay.firstChild;
        firstDay.style.gridColumn = grid;
    }
}
//function created to get booking dates
//1)create a function to mark dates
function markDays(day, val) {
    day.classList.remove('stay-day', 'start-day', 'end-day');
    if (new Date(val) < new Date(checkOutValue) &&
        new Date(val) > new Date(checkInValue)) {
        day.classList.add('stay-day');
    }
    if (checkInValue && val === checkInValue) {
        day.classList.add('start-day');
    }
    if (checkOutValue && val === checkOutValue) {
        day.classList.add('end-day');
    }
}
const date_diff_indays = function (date1, date2) {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return `${Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))} night(s)`;
};
function getBookingDate(day, dayStr, dateVal, nextDayVal) {
    if (!day.classList.contains('past-day')) {
        day.addEventListener('click', function () {
            if (!checkInValue || checkInSection.classList.contains('form-focus')) {
                checkIn.textContent = dayStr;
                checkInValue = dateVal;
                checkOut.textContent = 'Depart';
                smallCalCheckIn.textContent = dayStr;
                smallCalCheckOut.textContent = '';
                smallCalCheckOut.classList.remove('larger');
                smallCalCheckIn.classList.add('larger');
                smallCalLabel[0].classList.add('smaller');
                smallCalLabel[1].classList.remove('smaller');
                continueBox.classList.remove('transform-up');
                checkOutValue = '';
                clearCalendar.classList.add('clear-dates');
                checkInSection.classList.remove('form-focus');
                checkIn.classList.add('selected-date');
                checkOut.classList.remove('selected-date');
                checkOutSection.classList.add('form-focus');
                nxtDayValue = nextDayVal;
            }
            else if ((checkInValue && !checkOutValue) ||
                (checkInValue && checkOutValue)) {
                let dateValChecker = dateVal;
                if (new Date(dateValChecker) < new Date(checkInValue)) {
                    checkOut.textContent = 'Depart';
                    checkOutValue = '';
                    checkIn.textContent = dayStr;
                    checkInValue = dateValChecker;
                    nxtDayValue = nextDayVal;
                    smallCalCheckIn.textContent = dayStr;
                    smallCalCheckOut.textContent = '';
                    smallCalCheckOut.classList.remove('larger');
                    smallCalCheckIn.classList.add('larger');
                    smallCalLabel[0].classList.add('smaller');
                    smallCalLabel[1].classList.remove('smaller');
                    clearCalendar.classList.remove('clear-dates');
                    continueBox.classList.remove('transform-up');
                    checkOut.classList.remove('selected-date');
                    checkInSection.classList.remove('form-focus');
                    checkOutSection.classList.add('form-focus');
                }
                else {
                    checkOut.textContent = dayStr;
                    checkOutValue = dateValChecker;
                    smallCalCheckOut.textContent = dayStr;
                    smallCalCheckOut.classList.add('larger');
                    smallCalLabel[1].classList.add('smaller');
                    clearCalendar.classList.add('clear-dates');
                    checkOut.classList.add('selected-date');
                    continueBox.classList.add('transform-up');
                    locationInput.classList.remove('form-light');
                    no_of_nights.forEach(nights => {
                        nights.textContent = date_diff_indays(checkInValue, checkOutValue);
                    });
                }
            }
            generateMonths();
        });
    }
}
function generateMonths() {
    if (window.innerWidth > 770) {
        const calendars = document.querySelectorAll('.calendar');
        for (let i = 0; i < calendars.length; i++) {
            if (i > 3) {
                calendars[i].remove();
            }
            else if (i <= 3) {
                getMonth(firstMonth[i], 0, i, gridDaysOne[i]);
                getMonth(secondMonth[i], 1, i, gridDaysTwo[i]);
            }
        }
    }
    else if (window.innerWidth <= 770) {
        const daysList = document.querySelectorAll('.days');
        const months = document.querySelectorAll('.month');
        n = d.getMonth();
        x = 0;
        click = 0;
        count = 0;
        for (let i = 0; i < months.length; i++) {
            getMonth(months[i], 0, i, daysList[i]);
        }
    }
}
window.addEventListener('load', generateMonths);
window.addEventListener('resize', generateMonths);
slider.addEventListener('scroll', function () {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        let newCal = document.createElement('DIV');
        newCal.classList.add('calendar');
        newCal.innerHTML = `
           <div class="months">
              <h3 class="month-1 month"></h3>
              <h3 class="month-2 month"></h3>
            </div>
            <div class="calendar-days">
              <div class="grid-day-1 days"></div>
              <div class="grid-day-2 days"></div>
            </div>
            `;
        this.appendChild(newCal) && generateMonths();
    }
});
//***/
function rotateCalendars() {
    if (window.innerWidth > 770) {
        slider.style.transform = `translateZ(-290px) rotateY(${x}deg)`;
        for (let i = 0; i < calendars.length; i++) {
            calendars[i].style.transform = `rotateY(${i * angle}deg) translateZ(290px)`;
        }
    }
    else if (window.innerWidth <= 770) {
        slider.style.transform = `translateZ(0) rotateY(0deg)`;
        slider.scrollTop = 0;
        for (let i = 0; i < calendars.length; i++) {
            calendars[i].style.transform = `rotateY(0deg) translateZ(0)`;
        }
    }
}
window.addEventListener('load', rotateCalendars);
window.addEventListener('resize', rotateCalendars);
function disableBtn() {
    if (count > 0) {
        prev.classList.remove('disabled-btn');
    }
    else {
        prev.classList.add('disabled-btn');
    }
}
prev.addEventListener('click', function () {
    if (count > 0) {
        x += angle;
        slider.style.transform = `translateZ(-290px) rotateY(${x}deg)`;
    }
    if (count > 0) {
        count--;
    }
    if (click > 0) {
        click--;
    }
    else if (count > 0 && click === 0) {
        click = 3;
    }
    if (click === 3 && count !== 0) {
        n = n - 4;
        generateMonths();
    }
    disableBtn();
});
next.addEventListener('click', () => {
    count++;
    if (click < 3) {
        click++;
    }
    else {
        click = 0;
    }
    if (click === 0) {
        n = n + 4;
        generateMonths();
    }
    x -= angle;
    slider.style.transform = `translateZ(-290px) rotateY(${x}deg)`;
    disableBtn();
});
const body = document.body;
const scene = document.querySelector('.scene');
const locationSection = document.querySelector('#location-section');
const locationInput = document.querySelector('#location');
const checkInSection = document.querySelector('#check-in-section');
const checkOutSection = document.querySelector('#check-out-section');
const closeCalendar = document.querySelector('.close-cal');
const searchForm = document.querySelector('#search-form');
let showCalendar = false;
//event listener to add focus on form element
locationSection.addEventListener('click', function () {
    locationSection.classList.add('form-focus');
    locationInput.classList.add('focus');
    locationInput.focus();
});
//event listener for location Input
locationInput.addEventListener('input', function () {
    if (this.value !== '') {
        this.style.fontWeight = '600';
    }
    else {
        this.style.fontWeight = '500';
    }
});
//event listener to displayCalendar && add focus on form element
checkInSection.addEventListener('click', function (e) {
    showCalendar = true;
    hideSceneCalendar();
    slider.scrollTop = 0;
    checkOutSection.classList.remove('form-focus');
    this.classList.add('form-focus');
});
checkOutSection.addEventListener('click', function () {
    showCalendar = true;
    hideSceneCalendar();
    slider.scrollTop = 0;
    if (!checkInValue || checkInValue === '') {
        checkInSection.classList.add('form-focus');
    }
    else if (checkInValue || checkInValue !== '') {
        this.classList.add('form-focus');
        checkInSection.classList.remove('form-focus');
    }
});
//event listener to clear checkin & checkout dates
clearCalendar.addEventListener('click', function () {
    if (clearCalendar.classList.contains('clear-dates')) {
        checkIn.textContent = 'Arrive';
        checkOut.textContent = 'Depart';
        checkInValue = '';
        checkOutValue = '';
        smallCalCheckOut.textContent = '';
        smallCalCheckIn.textContent = '';
        smallCalCheckOut.classList.remove('larger');
        smallCalCheckIn.classList.remove('larger');
        smallCalLabel[0].classList.remove('smaller');
        smallCalLabel[1].classList.remove('smaller');
        continueBtn.classList.remove('transform-up');
        checkOut.classList.remove('selected-date');
        checkIn.classList.remove('selected-date');
        checkInSection.classList.remove('form-focus');
        checkOutSection.classList.remove('form-focus');
        this.classList.remove('clear-dates');
        continueBox.classList.remove('transform-up');
        no_of_nights.forEach(nights => {
            nights.textContent = '';
        });
        generateMonths();
    }
});
//event listener to close Calendar
function closeCal() {
    showCalendar = false;
    hideSceneCalendar();
    checkInSection.classList.remove('form-focus');
    checkOutSection.classList.remove('form-focus');
}
closeCalendar.addEventListener('click', closeCal);
continueBtn.addEventListener('click', closeCal);
//search form event listener
searchForm.addEventListener('submit', function () {
    if (!checkInValue || checkInValue === '') {
        checkInValue = todayValue;
    }
    if ((!checkOutValue || checkOutValue === '') &&
        (!checkInValue || checkInValue === todayValue)) {
        checkOutValue = tmrValue;
    }
    else if ((!checkOutValue || checkOutValue === '') &&
        checkInValue &&
        checkInValue !== '') {
        checkOutValue = nxtDayValue;
    }
    let checkInInput = document.createElement('INPUT');
    checkInInput.setAttribute('name', 'checkInDate');
    checkInInput.setAttribute('type', 'hidden');
    checkInInput.setAttribute('value', checkInValue);
    this.appendChild(checkInInput);
    let checkOutInput = document.createElement('INPUT');
    checkOutInput.setAttribute('name', 'checkOutDate');
    checkOutInput.setAttribute('type', 'hidden');
    checkOutInput.setAttribute('value', checkOutValue);
    this.appendChild(checkOutInput);
});
//window event listener for other calendar on small screens
function hideSceneCalendar() {
    if (!showCalendar) {
        scene.classList.remove('display-calendar');
        body.classList.remove('hidden');
        navBar.classList.remove('hide');
    }
    else if (showCalendar) {
        scene.classList.add('display-calendar');
        body.classList.add('hidden');
        navBar.classList.add('hide');
    }
}
//window-listener to remove classlist when not needed
window.addEventListener('click', function (e) {
    if (!locationSection.contains(e.target) && locationSection.classList.contains('form-focus')) {
        checkInSection.classList.add('form-focus');
        locationSection.classList.remove('form-focus');
        locationInput.classList.remove('focus');
        showCalendar = true;
        hideSceneCalendar();
    }
    if (!checkInSection.contains(e.target) &&
        !checkOutSection.contains(e.target) &&
        !scene.contains(e.target) &&
        !e.target.classList.contains('day') &&
        (!checkInSection.classList.contains('form-focus') || !locationSection.classList.contains('form-focus'))) {
        checkInSection.classList.remove('form-focus');
        checkOutSection.classList.remove('form-focus');
        showCalendar = false;
        hideSceneCalendar();
    }
});
