const tasksUrl = "http://localhost:3000/api/v1/tasks";

document.addEventListener('DOMContentLoaded', () => {
  console.log("loaded");
  getTasks();

  const createTaskForm = document.querySelector("#task-form");
  createTaskForm.addEventListener("submit", (e) => {
    createFormHandler(e);
  });
  //createTaskForm.addEventListener("submit", postTask)
});

function getTasks() {
  fetch(tasksUrl)
    .then(response => response.json())
    .then(tasks => {
      // remember our JSON data is a bit nested due to our serializer
      tasks.data.forEach(task => {
        const taskMarkup = `
          <div data-id=${task.id}>
            <h3>${task.attributes.name}</h3>
            <p>${task.attributes.description}</p>
            <p>${task.attributes.start_date}</p>
            <p>${task.attributes.hours}</p>
            <p>${task.attributes.completed_status}</p>
            <p>${task.attributes.initiative.name}</p>
            <button data-id=${task.id}>Edit</button>
          </div>
          <br><br>`;

          document.querySelector('#task-container').innerHTML += taskMarkup
      });
    });
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
  const initiativeName = document.querySelector("#initiatives").textContent;
  
  postFetch(nameInput, descriptionInput, hoursInput, startDateInput, initiativeId, initiativeName);
  console.log(nameInput, descriptionInput, hoursInput, startDateInput, initiativeId, initiativeName);
}

function postFetch(name, description, hours, start_date, initiative_id, initiative_name) {
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
    const taskData = task.data
    //render JSON response
    const taskMarkup = `
    <div data-id=${task.id}>
      <h3>${task.name}</h3>
      <p>${task.description}</p>
      <p>${task.start_date}</p>
      <p>${task.hours}</p>
      <p>${task.completed_status}</p>
      <p>${initiative_name}</p>
      <button data-id=${task.id}>Edit</button>
    </div>
    <br><br>`;

    document.querySelector('#task-container').innerHTML += taskMarkup;
  })
}