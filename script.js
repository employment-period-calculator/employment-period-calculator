const START_DATE_INPUT = document.getElementById("start-date");
const END_DATE_INPUT = document.getElementById("end-date");

const CALCULATED_BTN = document.getElementById("calculate-btn");
CALCULATED_BTN.addEventListener("click", calculate);

const resultParagraph = document.getElementById("result");

Date.prototype.addDays = function(n) {
  this.setDate(this.getDate() + n);
}

function calculate() {
  if (!START_DATE_INPUT.value || !END_DATE_INPUT.value) {
    alert('Please select dates');
    return;
  }
  let startDate = new Date(START_DATE_INPUT.value);
  const endDate = new Date(END_DATE_INPUT.value);
  if (startDate > endDate) {
    alert('Start date cannot be after end date!');
    return;
  }
  let months, days = 0;
  if (startDate.getDate() > endDate.getDate()) {
    let dateMoveResult = findDaysTillFirstOfNextMonth(startDate);
    days = dateMoveResult.days;
    startDate = dateMoveResult.startDate;
  }
  months = endDate.getFullYear() - startDate.getFullYear();
  months *= 12;
  months += endDate.getMonth();
  months -= startDate.getMonth();
  days += endDate.getDate() - startDate.getDate();

  resultParagraph.textContent = months === 1 
    ? `1 month and ${days == 1 ? "1 day" : `${days} days`}`
    : `${months} months and ${days == 1 ? "1 day" : `${days} days`}`;
}

function findDaysTillFirstOfNextMonth(date) {
  let days = 0;
  let startDate = new Date(date);
  while (startDate.getDate() != 1) {
    days++;
    startDate.addDays(1);
  }
  return {startDate, days};
}