export default function Trader(name, options, callback) {
  this.callback = callback;
}

Trader.prototype = {
  process(e) {},
};
