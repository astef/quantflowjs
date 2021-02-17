export default function App(options, callback) {
  this.callback = callback;
  this.options = options;
}

App.prototype = {
  process(e) {},

  run() {
    // open trader

    // open state src

    // open market data src (with history from current state)
    // wait market data is online

    // open order dest
    // open order src
  },
};
