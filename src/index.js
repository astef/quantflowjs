import _ from "lodash";

import { Message, Shutdown } from "./internal-api.js";
import Trader from "./model/trader.js";
import Db from "./db/db.js";
import Gw from "./gw/gw.js";
import Ui from "./ui/ui.js";
import Timer from "./sample/timer-module.js";

let messageBuffer = [];

function onInput(source, targets, payload) {
  messageBuffer.push(new Message(source, targets, payload));
}

// initialize modules
const ui = new Ui(
  "repl",
  {},
  _.partial(onInput, "ui", ["trader", "db", "gw", "internal"])
);
const gw = new Gw("ib", {}, _.partial(onInput, "gw", ["trader", "db"]));
const db = new Db("elastic", {}, _.partial(onInput, "db", ["trader"]));
const trader = new Trader(
  "strategy1",
  {},
  _.partial(onInput, "trader", ["gw", "db"])
);
const timer = new Timer("t", { ms: 1000 });

const listeners = {
  trader,
  db,
  ui,
  gw,
  timer,
  internal: {
    exit: false,
    process(e) {
      if (e instanceof Shutdown) {
        for (const key in listeners) {
          _.result(listeners[key], "close");
        }
      }
    },
    close() {
      this.exit = true;
    },
  },
};

function process() {
  // process messages
  while (messageBuffer.length) {
    const messageBufferTmp = messageBuffer;
    messageBuffer = [];

    for (const message of messageBufferTmp) {
      for (const target of message.targets) {
        listeners[target].process(message.payload);
      }
    }
  }

  if (!listeners.internal.exit) {
    // continue processing
    setImmediate(process);
  }
}

// plan main processing loop
setImmediate(process);
