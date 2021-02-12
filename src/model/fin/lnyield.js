export default function LnYield() {
  this.lny = null;
  this.lastPrice = null;
}

LnYield.prototype = {
  get initialized() {
    return this.lastPrice !== null;
  },

  next(price) {
    if (this.lastPrice !== null) {
      this.lny = Math.log(price / this.lastPrice);
    }
    this.lastPrice = price;
  },
};
