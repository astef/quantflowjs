export default function () {
  return {
    lny: null,
    lastPrice: null,

    get initialized() {
      return this.lastPrice != null;
    },

    /**
     * @param {number} price
     */
    next(price) {
      if (this.lastPrice !== null) {
        this.lny = Math.log(price / this.lastPrice);
      }
      this.lastPrice = price;
    },

    reset() {
      this.lastPrice = null;
      this.lny = null;
    },
  };
}
