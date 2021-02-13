import repl from "repl";
import _ from "lodash";

import { Shutdown } from "./../internal-api.js";

export default function Ui(name, options, callback) {
  this.callback = callback;
  this.options = options;
  this.server = repl.start({ prompt: "> ", eval: _.bind(this.onEval, this) });
}

Ui.prototype = {
  process(e) {
    console.log("message processed");
  },

  close() {
    this.server.close();
    console.log("ui closed");
  },

  onEval(cmd, context, filename, replCallback) {
    const command = _.result(cmd, "trim", "").toLowerCase();
    console.log(`Repl command received: ${command}`);

    if (command === "exit") {
      this.callback(new Shutdown());
      replCallback(null, "Shutdown triggered.");
    } else if (command === "any") {
      this.callback({});
      replCallback(null, "{} sent.");
    } else {
      replCallback(null, "Unknown command");
    }
  },
};
