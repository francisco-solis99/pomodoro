
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
      handler(titleActivity);
      e.target.reset();
    })
  },

  bindStartActivity(handler){
    this.activitiesListDOM.addEventListener('click', (e) => {
      if(!e.target.classList.contains('pomodoro__start-btn')) return;
      const activitiyId = Number(e.target.parentNode.id);

      // pass the activitie in progress state to true and get the activitie accroding to the id that we got
      handler(activitiyId);
    })
  },

  bindDeleteActivity(handler){
    this.activitiesListDOM.addEventListener('click', (e) => {
      if(!e.target.classList.contains('pomodoro__delete-icon')) return;
      const activitiyId = Number(e.target.parentNode.id);
      handler(activitiyId);
    })
  },

  toggleActivities(){
    const allActivities = document.querySelectorAll('.pomodoro__task > .pomodoro__start-btn');
    console.log(allActivities)
    allActivities.forEach(activityBtn => {
      if(activityBtn.textContent === 'Done') return;
      activityBtn.disabled = !activityBtn.disabled;
    });
  },

  selectDOMActivity(id){
    const act = document.querySelector(`[id="${id}"]`);
    if(!act) console.info('id activitie not founded');
    return act;
  },

  createActivitie(activity){
    const liItem = document.createElement('li');
    const classListActivity = activity.completed ? ['pomodoro__title-task', 'task__completed'] : ['pomodoro__title-task'];
    const classListButton = activity.completed ? ['pomodoro__start-btn', 'btn__disabled'] : ['pomodoro__start-btn'];
    liItem.className = 'pomodoro__task';
    liItem.id = activity.id;
    liItem.innerHTML = `
        <button type="button" class="${classListButton.join(' ')}">${activity.completed ? 'Done' : 'Start'}</button>
        <p class="${classListActivity.join(' ')}">${activity.title}</p>
        <span class="pomodoro__delete-icon"></span>
    `
    return liItem;
  },

  renderInitialActivities(activities){
    this.activitiesListDOM.innerHTML = '';
    if(!activities.length){
      this.activitiesListDOM.innerHTML = `
        <p class="pomodoro__default-message">Add something to complete in a Pomodoro 😀⌛</p>
      `;
      return;
    }
    const fragment = document.createDocumentFragment();
    activities.forEach(item => fragment.appendChild(this.createActivitie(item)));
    this.activitiesListDOM.appendChild(fragment);
  },


  renderChangesInActivities(activity, action){
    const actions = {
      'startPomodoro': () => {
        const actDOM = this.selectDOMActivity(activity.id);
        actDOM.querySelector('button').textContent = 'In progress...';
        this.timerDisplay.querySelector('h2').textContent = activity.title;
        this.toggleActivities();
      },
      'completeActivity': () => {
        const actDOM = this.selectDOMActivity(activity.id);
        const title = actDOM.querySelector('p');
        const button = actDOM.querySelector('button');

        title.classList.add('task__completed');
        button.textContent = 'Done';
        button.classList.remove('pomodoro__start-btn');
        button.classList.add('btn__disabled');
        this.timerDisplay.querySelector('h2').textContent = 'Break Time';
      },
      'endPomodoro': () => {
        this.toggleActivities();
        this.timerDisplay.querySelector('h2').textContent = '';
      },
      'addActivity': () => {
        if(!document.querySelector('.pomodoro__task')) this.activitiesListDOM.innerHTML = '';

        const DOMactivity = this.createActivitie(activity);
        this.activitiesListDOM.appendChild(DOMactivity);
      },
      'deleteActivity': () => {
        const DOMactivity =  this.selectDOMActivity(activity.id);
        DOMactivity.remove();

        // in case if there are no more activities
        if(this.activitiesListDOM.querySelector('li')) return;
        this.activitiesListDOM.innerHTML = `
        <p class="pomodoro__default-message">Add something to complete in a Pomodoro 😀⌛</p>
       `;

      }
    };

    if(!actions[action]) {
      console.info("Sorry this action is not possible 😮, check it and try again");
      return;
    }
    actions[action]();
  }
}
