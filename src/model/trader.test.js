import test from "ava";
import { AccountUpdate } from "./market-events/account.js";
import { Instrument } from "./market-events/instrument.js";
import { OpenSession, CloseSession } from "./market-events/session.js";
import { Deal } from "./market-events/deal.js";
import Trader from "./trader.js";

test("1", (t) => {
  const trader = new Trader((order) => {});

  trader.process(new Instrument("i1"));

  trader.process(new AccountUpdate([], [], 10000.0));

  for (let index = 0; index < 10; index++) {
    trader.process(new OpenSession("i1"));

    trader.process(
      new Deal("i1", Date.UTC(2020, 0, 1, 10, 0, 0, 15), 1003.25, 62)
    );
    trader.process(
      new Deal("i1", Date.UTC(2020, 0, 1, 10, 0, 0, 16), 1003.27, 144)
    );
    trader.process(
      new Deal("i1", Date.UTC(2020, 0, 1, 10, 0, 0, 19), 1003.29, 114)
    );

    trader.process(new CloseSession("i1"));
  }

  t.pass();
});
