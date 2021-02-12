import _ from "lodash";

const o = {
  x: 4,
  do() {
    console.log(`x=${this.x}`);
  },
};

const caller = {
  x: 99,
  do(callback) {
    callback();
  },
};

// caller.do(o.do);
caller.do(() => o.do());
caller.do(_.partial(o.do, 1));
