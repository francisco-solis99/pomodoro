export default function Controller(model, view){
  this.model = model;
  this.view = view;
  // binding the DOM VIew events
  this.view.bindAddActivity(this.handlerActivity.bind(this));
  this.view.bindStartActivity(this.handlerStartPomodoro.bind(this));

  // init the local storage tasks
  this.view.renderInitialActivities(this.model.activitiesList);
}

Controller.prototype = {
  constructor: Controller,

  handlerActivity: function(title) {
    this.model.addActivity(title);
    const lastActAdded = this.model.activitiesList[this.model.activitiesList.length - 1];
    return {...lastActAdded};
  },

  handlerStartPomodoro: function(idActivitie){
    this.model.toggleInProgressState(idActivitie);
    return this.sendActivityCopy(idActivitie);
  },

  sendActivityCopy(id){
    const activitie = this.model.activitiesList[this.model.findIndexActivity(id)];
    return {...activitie};
  }

}
