export function Deal(instrumentId, moment, price, amount) {
  this.instrumentId = instrumentId;
  this.moment = moment;
  this.price = price;
  this.amount = amount;
}

Deal.prototype = {};
