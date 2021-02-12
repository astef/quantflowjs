export default function Timer(name, options, callback) {
  console.log("timer opened");

  this.interval = setInterval(this.onTick, options.ms);
}

Timer.prototype = {
  close() {
    clearTimeout(this.interval);
    console.log("timer closed");
  },

  onTick() {
    console.log(`tick: ${Date.now()}`);
  },
};
