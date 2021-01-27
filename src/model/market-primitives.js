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
  guard.requiredDate(moment);
  this.moment = moment;
}

/**
 * @param {number} price
 */
export function Price(price) {
  guard.requiredFiniteNumber(price);
  this.price = price;
}
