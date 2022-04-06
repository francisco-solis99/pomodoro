import {Task} from './Task.js'

export function Pomodoro(workTime, breakTime, taskListElement, timerElement){
  this.workTime = workTime;
  this.breakTime = breakTime;
  this._tasksList = JSON.parse(localStorage.getItem('tasks')) ?? [];

  // DOM elements
  this.taskListHtml = taskListElement;
  this.timerHtml = timerElement;
  this.titleAct = this.timerHtml.querySelector('h2');
  this.timerPomodoro = this.timerHtml.querySelector('p');
  this.countdown = null;

  if(this._tasksList.length) this.initLocalStorage();
}


Pomodoro.prototype = {
  constructor: Pomodoro,

  initLocalStorage(){
    this._tasksList.forEach(task => {
        this.addTask(new Task(task))
    });
  },

  addTask(task){
    task.id = this._tasksList.length;
    this._tasksList.push(task);
    this.insertTask(task);
    localStorage.setItem('tasks', JSON.stringify([...this.tasksList]));
  },

  insertTask(task){
    this.taskListHtml.insertAdjacentHTML('beforeend', task.generateHtmlTask());
    // add listener to start the pomodoro activity
    const button = this.taskListHtml.lastElementChild.querySelector('.pomodoro__start-btn');
    button.addEventListener('click', () => this.startTask(task));
  },

  get tasksList(){
    return this._tasksList;
  },

  startTask(task){
    clearInterval(this.countdown);
    const seconds = this.workTime * 60;
    console.log(seconds)
    this.titleAct.textContent = task.title;
    this.displayTime(seconds)
    const now = Date.now(); // in miliseconds
    const then = now + (seconds * 1000); // multiply to get the time in ms when the time has been end


    this.countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        console.log(secondsLeft)
        if(secondsLeft < 0) {
          clearInterval(this.countdown);
          task.toggleState();
          this.titleAct.textContent = '';
          this.doneTask(task);
          return;
        }
        this.displayTime(secondsLeft);
    }, 1000);

    console.log('SIGUE AQUI⌛');
  },

  doneTask(task){
    if(!task.completeState) return;
    const divTask = this.findTaskHtml(task.id);
    if(!divTask) return console.error('HTML Task not foundend, check it id');

    const button = divTask.querySelector('button');
    divTask.querySelector('p').classList.add('task__completed');
    button.classList.add('btn__disabled');
    button.disabled = true;
  },

  findTaskHtml(id){
    console.log(this.taskListHtml);
    const taskElement = this.taskListHtml.querySelector(`#task-${id}`);
    return taskElement;
  },

  displayTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remindSeconds = seconds % 60;
    const display = `${minutes}:${remindSeconds < 10 ? '0' + remindSeconds : remindSeconds}`;
    document.title = display;
    this.timerPomodoro.textContent = display;
  }


}
