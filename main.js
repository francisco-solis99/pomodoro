// import {Task} from './modules/Task.js'
// import {Pomodoro} from './modules/Pomodoro.js'

// // DOM elements
// const inputTask = document.querySelector('.pomodoro__task');
// const form = document.querySelector('.pomodoro__form');
// const taskList = document.querySelector('.pomodoro__task-list');
// const timer = document.querySelector('.pomodoro__counter-wrapper');


// // Event listener
// form.addEventListener('submit', addPomodoro);
// const pomo = new Pomodoro(0.1, 5, taskList, timer);


// function addPomodoro(e){
//   e.preventDefault();
//   const task = new Task({title: inputTask.value, state: false});
//   pomo.addTask(task);
//   e.target.reset();
// }

// import View from './modules/View.mjs';
import Model from './modules/Model.mjs';
import Controller from './modules/Controller.mjs';
import View from './modules/View.mjs';

const app = new Controller(new Model(), new View());

// app.model.addActivity('Make cookies');
// app.model.addActivity('Workout');
// app.model.addActivity('Go to the gym');
// console.log(app.model.activitiesList);
// app.model.toggleInProgressState(1);
// console.log(app.model.activitiesList);
