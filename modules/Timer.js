

export default function Timer(timeToWork, timeToRest, counter){
  this.timeToWork = timeToWork;
  this.timeToRest = timeToRest;
  this.HTMLcounter = counter;
  this.countdown = null;

  this.displayCounter = this.HTMLcounter.querySelector('p');
}


Timer.prototype = {
  constructor: Timer,

  startTimer(stateActive){
    console.log(stateActive);
    const time = stateActive ? this.timeToWork : this.timeToRest;
    clearInterval(this.countdown);
    this.displayTime(time * 60);
    const now = Date.now();
    const then = now + (time * 60000);

    return new Promise((resolve, reject) => {
      this.countdown = setInterval(() => {
        const seconds = Math.round((then - Date.now()) / 1000);
        if(seconds < 0){
          clearInterval(this.countdown);
          resolve(seconds);
          return;
        }
        this.displayTime(seconds)
      }, 1000)
    });
  },

  displayTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const remindSeconds = seconds % 60;
    const display = `${minutes}:${remindSeconds < 10 ? '0' + remindSeconds : remindSeconds}`;
    document.title = display;
    this.displayCounter.textContent = display;
  }
}
