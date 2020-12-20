const tasksUrl = "http://localhost:3000/api/v1/tasks";

document.addEventListener('DOMContentLoaded', () => {
  console.log("loaded");
  getTasks();
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
            <button data-id=${task.id}>edit</button>
          </div>
          <br><br>`;

          document.querySelector('#task-container').innerHTML += taskMarkup
      })
    });
}