
// constructor
export default function Model(){
  this.activitiesList = JSON.parse(localStorage.getItem('activities')) ?? [];
}

// prototype
Model.prototype = {
  constructor: Model,

  addActivity(title){
    // console.log(this.activitiesList[this.activitiesList.length - 1]);
    console.log(title);
    const activity = {
      id: this.activitiesList.length ? this.activitiesList[this.activitiesList.length - 1].id + 1 : 0,
      title,
      completed: false,
      inProgress: false,
    }
    this.activitiesList.push(activity);
    console.log(this.activitiesList);
    this.saveActivities();
  },

  completedActivitie(id){
    const activityIndex = this.findIndexActivity(id);
    this.activitiesList[activityIndex].completed = true;
    this.saveActivities();
  },

  toggleInProgressState(id){
    const activityIndex = this.findIndexActivity(id);
    console.log(activityIndex);
    this.activitiesList[activityIndex].inProgress = !this.activitiesList[activityIndex].inProgress;
    this.saveActivities();
  },

  findIndexActivity(id){
    return this.activitiesList.findIndex(activity => activity.id === id);
  },

  saveActivities(){
    localStorage.setItem('activities', JSON.stringify([...this.activitiesList]));
  }

}
