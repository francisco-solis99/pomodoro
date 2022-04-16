
// constructor
export default function Model(){
  this.activitiesList = JSON.parse(localStorage.getItem('activities')) ?? [];
  this.onActivitiesChanged = null;
}

// prototype
Model.prototype = {
  constructor: Model,

  addActivity(title){
    // console.log(this.activitiesList[this.activitiesList.length - 1]);
    const activity = {
      id: this.activitiesList.length ? this.activitiesList[this.activitiesList.length - 1].id + 1 : 0,
      title,
      completed: false,
      inProgress: false,
    }
    this.activitiesList.push(activity);
    console.log(this.activitiesList);
    this.saveActivities();

    this.onActivitiesChanged({...activity}, 'addActivity');
  },

  completedActivity(id){
    const activityIndex = this.findIndexActivity(id);
    this.activitiesList[activityIndex].completed = true;
    this.saveActivities();
    this.onActivitiesChanged({...this.activitiesList[activityIndex]}, 'completeActivity');
  },

  toggleInProgressState(id){
    const activityIndex = this.findIndexActivity(id);
    this.activitiesList[activityIndex].inProgress = !this.activitiesList[activityIndex].inProgress;
    this.saveActivities();
    if(this.activitiesList[activityIndex].inProgress){
      this.onActivitiesChanged({...this.activitiesList[activityIndex]}, 'startPomodoro');
      return;
    }
    this.onActivitiesChanged({...this.activitiesList[activityIndex]}, 'endPomodoro');

  },

  findIndexActivity(id){
    return this.activitiesList.findIndex(activity => activity.id === id);
  },

  saveActivities(){
    localStorage.setItem('activities', JSON.stringify([...this.activitiesList]));
  },

  bindActivitiesList(callback){
    this.onActivitiesChanged = callback;
  }

}
