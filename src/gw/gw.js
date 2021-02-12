export default function Gw(name, options, callback) {
  this.connection = {};
  console.log("gw opened");
}

Gw.prototype = {
  process(e) {
    console.log("message processed by gw");
  },

  close() {
    console.log("gw closed");
  },

  onBatchCompleted() {
    console.log("gw batch completed");
  },
};
