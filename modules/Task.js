export function Task({title, completeState = false}){
  this.id = null
  this.title = title;
  this.completeState = completeState;
}

Task.prototype = {
  constructor: Task,

  toggleState(){
    this.completeState = !this.completeState;
  },

  generateHtmlTask(){
    return `
    <div class="task__item" id="task-${this.id}">
      <button type="button" class="pomodoro__start-btn">Start</button>
      <p class="pomodoro__title-task">${this.title}</p>
    </div>
    `;
  }

}
