import _ from "lodash";

import { Message, Shutdown } from "./internal-api.js";
import Trader from "./model/trader.js";
import Db from "./db/db.js";
import Gw from "./gw/gw.js";
import Ui from "./ui/ui.js";

let messageBuffer = [];

function onInput(source, targets, payload) {
  messageBuffer.push(new Message(source, targets, payload));
}

// initialize modules
const listeners = {
  trader: new Trader(
    {
      type: "str1",
    },
    _.partial(onInput, "trader", ["gw", "db"])
  ),
  db: new Db({ type: "elastic" }, _.partial(onInput, "db", ["trader"])),
  ui: new Ui(
    { type: "repl" },
    _.partial(onInput, "ui", ["trader", "db", "gw", "internal"])
  ),
  gw: new Gw({ type: "ib" }, _.partial(onInput, "gw", ["trader", "db"])),
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
