import LNY from "./lnyield.js";
import guard from "./../guard.js";

export default function (startFrom, period) {
  return {
    lastMoment: startFrom,

    lny: LNY(),

    next(moment, dealPrice, volume) {
      guard.requiredNumber(dealPrice, volume);

      if (moment - this.lastMoment) {
        this.lastMoment = moment;
      }

      //
      this.lny.next(lastDealPrice);
      if (this.lny.initialized) {
        // ...
      }
    },
    reset() {
      this.lny.reset();
    },
  };
}
