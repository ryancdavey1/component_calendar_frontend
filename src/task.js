class Task {

  static allTasks = []

  constructor(task, taskAttributes) {
    //debugger
    this.id = task.id;
    this.name = taskAttributes.name;
    this.description = taskAttributes.description;
    this.hours = taskAttributes.hours;
    this.completed_status = taskAttributes.completed_status;
    this.initiative = taskAttributes.initiative;
    Task.allTasks.push(this);
  }

  renderTask() {
    return `
    <div data-id=${this.id} class="box">
      <h3>${this.name}</h3>
      <p>${this.description}</p>
      <p>${this.hours}</p>
      <p>${this.completed_status}</p>
      <p>${this.initiative.name}</p>
      <button data-id=${this.id} class="delete-task">Delete</button>
    </div>
    <br><br>`;
  }

  deleteTask(){
    const taskId = this.parentElement.dataset.id

    fetch(`${taskURL}/${taskId}`, {
        method: "DELETE"
    })

    this.parentElement.remove()
}
}