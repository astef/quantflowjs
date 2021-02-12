export function LimitOrder(id, instrument, amount, price, type) {
  this.id = id;
  this.instrument = instrument;
  this.amount = amount;
  this.price = price;
  this.type = type;
}

LimitOrder.prototype = {};
