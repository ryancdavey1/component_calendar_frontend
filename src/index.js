const tasksUrl = "http://localhost:3000/api/v1/tasks";
//const Task = require('../task.js');

  const years = [2021];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months31Days = ["January", "March", "May", "August", "October", "December"]
  const months30Days = ["April", "June", "July", "September", "November"]

document.addEventListener('DOMContentLoaded', () => {
  // fetch and load tasks
  renderCalendar();
  getTasks();

  const createTaskForm = document.querySelector("#task-form");
  createTaskForm.addEventListener("submit", (e) => {
    createFormHandler(e);
  });
});

function getTasks() {
  fetch(tasksUrl)
    .then(response => response.json())
    .then(tasks => {
      // remember our JSON data is a bit nested due to our serializer
      tasks.data.forEach(task => {
        let dayContainer = document.getElementById(task.attributes.start_date)
        let newTask = new Task(task, task.attributes)
        
        dayContainer.innerHTML += newTask.renderTask();
      });
    })
    .catch(err => console.log(err));
}

function postTask() {
  event.preventDefault();
  //console.log(e.target);
  const nameInput = document.querySelector("#input-name").value;
  const descriptionInput = document.querySelector("#input-description").value;
  const hoursInput = parseInt(document.querySelector("#input-hours").value);
  const startDateInput = document.querySelector("#start-date").value;
  const initiativeId = parseInt(document.querySelector("#initiatives").value);
  console.log("submitted");
  console.log(nameInput, descriptionInput, hoursInput, startDateInput, initiativeId);
}

function createFormHandler(e) {
  e.preventDefault();
  console.log(e);
  const nameInput = document.querySelector("#input-name").value;
  const descriptionInput = document.querySelector("#input-description").value;
  const hoursInput = parseInt(document.querySelector("#input-hours").value);
  const startDateInput = document.querySelector("#start-date").value;
  const initiativeId = parseInt(document.querySelector("#initiatives").value);
  //const initiativeName = document.querySelector("#initiatives").textContent;
  
  postFetch(nameInput, descriptionInput, hoursInput, startDateInput, initiativeId);
}

function postFetch(name, description, hours, start_date, initiative_id) {
  console.log(name, description, hours, start_date, initiative_id);
  let bodyData = {
    name: name, 
    description: description,
    start_date: start_date,
    hours: hours, 
    completed_status: false,
    initiative_id: initiative_id
  }

  fetch(tasksUrl, {
    // POST request
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(task => {
    //debugger
    console.log(task);
    //render JSON response
    let dayContainer = document.getElementById(task.data.attributes.start_date);
    let newTask = new Task(task, task.data.attributes);
    let renderedTask = newTask.renderTask();
    let deleteButton = renderedTask.querySelector(".delete-task");
    deleteButton.addEventListener('submit', e => deleteTask(e))
    dayContainer.innerHTML += renderedTask;
    ;
  })
}

function renderCalendar() {
  let days = 28;
  let calendarMarkup = ``;
  years.forEach(year => {
    calendarMarkup += `<h1>${year}</h1>`
    months.forEach((month, index) => {
      calendarMarkup += `<h2>${month}</h2>`
      if (months31Days.includes(month)) {
        days = 31;
      } else if (months30Days.includes(month)) {
        days = 30;
      }
      for(let i = 1; i <= days; i++) {
        if (index < 10) {
          if (i < 10) {
            calendarMarkup += `<div class="card--content" id="${year}-0${index+1}-0${i}"><h3>${i}</h3></div>`
          } else {
            calendarMarkup += `<div class="card--content" id="${year}-0${index+1}-${i}"><h3>${i}</h3></div>`
          }
        } else {
          if (i < 10) {
            calendarMarkup += `<div class="card--content" id="${year}-${index+1}-0${i}"><h3>${i}</h3></div>`
          } else {
            calendarMarkup += `<div class="card--content" id="${year}-${index+1}-${i}"><h3>${i}</h3></div>`
          }
        }
      }
    })
  })
  
  document.querySelector('.card').innerHTML += calendarMarkup;
}
