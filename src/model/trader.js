import { SessionEnd, Deal, Session } from "./market-events.js";

export default function () {
  return {
    instruments: [],

    instrumentTraders: [],

    memb: "asd",

    /**
     *
     * @param {SessionBegin | Tick | Deal | SessionEnd} event
     */
    process(event) {
      if (event instanceof Session) {
      } else if (event instanceof Tick) {
      } else if (event instanceof Deal) {
      } else if (event instanceof SessionEnd) {
      }
    },
  };
}
