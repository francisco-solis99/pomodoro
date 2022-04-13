export function Task({title, completeState = false, id}){
  this.id = id ?? null;
  this.title = title;
  this.completeState = completeState;
  this.htmlTask = null;
}

Task.prototype = {
  constructor: Task,

  completeTask(){
    this.completeState = true;
  },

  generateHtmlTask(){
    this.htmlTask =  `
    <div class="task__item" id="task-${this.id}">
      <button type="button" class="pomodoro__start-btn">Start</button>
      <p class="pomodoro__title-task">${this.title}</p>
    </div>
    `;
    return this.htmlTask;
  }

}
