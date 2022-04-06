import {Task} from './modules/Task.js'
import {Pomodoro} from './modules/Pomodoro.js'

// DOM elements
const inputTask = document.querySelector('.pomodoro__task');
const form = document.querySelector('.pomodoro__form');
const taskList = document.querySelector('.pomodoro__task-list');
const timer = document.querySelector('.pomodoro__counter-wrapper');


// Event listener
form.addEventListener('submit', addPomodoro);
const pomo = new Pomodoro(0.1, 5, taskList, timer);


function addPomodoro(e){
  e.preventDefault();
  const task = new Task({title: inputTask.value, state: false});
  pomo.addTask(task);
  e.target.reset();
}
