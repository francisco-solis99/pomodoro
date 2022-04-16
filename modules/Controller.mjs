import Timer from './Timer.js';

export default function Controller(model, view){
  this.model = model;
  this.view = view;
  // binding the DOM VIew events
  this.view.bindAddActivity(this.handlerActivity.bind(this));
  this.view.bindStartActivity(this.handlerStartPomodoro.bind(this));

  // binding pomodoro's activities when changes some property to make changes in UI
  this.model.bindActivitiesList(this.onActivitiesChanged.bind(this));

  // init the local storage tasks
  this.view.renderInitialActivities(this.model.activitiesList);

  this.timer = new Timer(0.1,0.2,this.view.timerDisplay);
}

Controller.prototype = {
  constructor: Controller,

  onActivitiesChanged: function(activity, action){
    // make the change in the UI
    return this.view.renderChangesInActivities(activity , action);
  },

  handlerActivity: function(title) {
    this.model.addActivity(title);
  },

  handlerStartPomodoro: function(idActivitie){
    this.model.toggleInProgressState(idActivitie);
    this.handlerTimer(idActivitie)
  },

  handlerTimer: async function(idActivitie) {
    await this.timer.startTimer(true); //timer to work in teh current activity
    this.model.completedActivity(idActivitie);
    await this.timer.startTimer(false); //timer to rest
    this.model.toggleInProgressState(idActivitie);
  },

  sendActivityCopy(id){
    const activitie = this.model.activitiesList[this.model.findIndexActivity(id)];
    return {...activitie};
  }

}
