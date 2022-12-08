
//currentMonth variable will keep track of the month we are currently on, if its = to -1 then its the previous month in relation to the current month
let currentMonth = 0;
//daySelected represents whichever day we have currently clicked on in the calendar
let daySelected = null;
//Array of event objects
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newTask = document.getElementById('newTask');
const deleteTaskDisplay = document.getElementById('deleteTaskDisplay');
const backDrop = document.getElementById('taskBackDrop');
const addTaskTitle = document.getElementById('addTaskTitle');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openOverlay(date) {
  daySelected = date;
     
  const eventForDay = events.find(e => e.date === daySelected);

  if (eventForDay) {
    document.getElementById('taskDesc').innerText = eventForDay.title;
    deleteTaskDisplay.style.display = 'block';
  } else {
    newTask.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function displayCalendar() {
  const date = new Date();

  if (currentMonth !== 0) {
    date.setMonth(new Date().getMonth() + currentMonth);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && currentMonth === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('task');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openOverlay(dayString));
    } else {
      daySquare.classList.add('paddingDays');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeOverlay() {
  addTaskTitle.classList.remove('error');
  newTask.style.display = 'none';
  deleteTaskDisplay.style.display = 'none';
  backDrop.style.display = 'none';
  addTaskTitle.value = '';
  daySelected = null;
  displayCalendar();
}

function saveTask() {
  if (addTaskTitle.value) {
    addTaskTitle.classList.remove('error');

    events.push({
      date: daySelected,
      title: addTaskTitle.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeOverlay();
  } else {
    addTaskTitle.classList.add('error');
  }
}

function deleteTask() {
  events = events.filter(e => e.date !== daySelected);
  localStorage.setItem('events', JSON.stringify(events));
  closeOverlay();
}

function initializeButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    currentMonth++;
    displayCalendar();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    currentMonth--;
    displayCalendar();
  });

  document.getElementById('addButton').addEventListener('click', saveTask);
  document.getElementById('cancelButton').addEventListener('click', closeOverlay);
  document.getElementById('deleteButton').addEventListener('click', deleteTask);
  document.getElementById('closeButton').addEventListener('click', closeOverlay);
}

initializeButtons();
displayCalendar();