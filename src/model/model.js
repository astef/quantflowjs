export default function Model(options, callback) {
  this.callback = callback;
  this.options = options;
}

Model.prototype = {
  process(e) {},

  run() {
    // init app

    // open state src (collection name)

    // open market data src (with history from current state)
    // wait market data is online

    // open order dest
    // open order src
  },
};
