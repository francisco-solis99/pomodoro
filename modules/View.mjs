

export default function View() {
  this.form = document.querySelector('.pomodoro__form');
  this.timerDisplay = document.querySelector('.pomodoro__counter-wrapper');
  this.activitiesListDOM = document.querySelector('.pomodoro__task-list');

}

View.prototype = {
  constructor: View,

  bindAddActivity(handler) {
      this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleActivity = e.target.querySelector('input[type="text"]').value;
      const newActivity = handler(titleActivity);
      e.target.reset();

      console.log(newActivity);

      // create the new task and added to the task list UI
      const DOMactivitie = this.createActivitie(newActivity);
      this.activitiesListDOM.appendChild(DOMactivitie);
    })
  },

  bindStartActivity(handler){
    this.activitiesListDOM.addEventListener('click', (e) => {
      if(!e.target.classList.contains('pomodoro__start-btn')) return;
      const activitiyId = Number(e.target.parentNode.id);

      // pass the activitie in progress state to true and get the activitie accroding to the id that we got
      const activityToStart =  handler(activitiyId);

      // uptated the activitie in progress in the UI
      this.timerDisplay.querySelector('h2').textContent = activityToStart.title;

    })
  },

  createActivitie(activity){
    const liItem = document.createElement('li');
    liItem.className = 'pomodoro__task';
    liItem.id = activity.id;
    liItem.innerHTML = `
        <button type="button" class="pomodoro__start-btn">Start</button>
        <p class="pomodoro__title-task">${activity.title}</p>
    `
    return liItem;
  },

  renderInitialActivities(activities){
    const fragment = document.createDocumentFragment();
    activities.forEach(item => fragment.appendChild(this.createActivitie(item)));
    this.activitiesListDOM.appendChild(fragment);
  }
}
