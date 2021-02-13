export function AccountUpdate(positions, orders, money) {
  this.positions = positions;
  this.orders = orders;
  this.money = money;
}

AccountUpdate.prototype = {};

export function AccountOrder(orderId, instrument, state) {
  this.orderId = orderId;
  this.instrument = instrument;
  this.state = state;
}

export function AccountPosition(instrumentId, amount) {
  this.instrumentId = instrumentId;
  this.amount = amount;
}
