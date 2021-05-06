export default function Db(options, callback) {
  this.callback = callback;
  this.options = options;
  this.connection = {};
  console.log("db opened");
}

Db.prototype = {
  process(e) {
    console.log("message processed by db");
  },

  close() {
    console.log("db closed");
  },

  onBatchCompleted() {
    console.log("db batch completed");
  },
};
