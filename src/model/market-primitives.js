import * as guard from "./../guard.js";

export function Session(id) {
  this.id = id;
}

/**
 *
 * @param {Session} session
 * @param {string} symbol
 */
export function Instrument(session, symbol) {
  this.symbol = symbol;
}

export function Moment(moment) {
  guard.isDate(moment);
  this.moment = moment;
}

/**
 * @param {number} price
 */
export function Price(instrument, price) {
  guard.isInstanceof(instrument, Instrument);
  guard.isFiniteNumber(price);
  // TODO check session range
  // TODO check instrument price properties, etc.
  this.price = price;
}
