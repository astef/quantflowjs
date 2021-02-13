import _ from "lodash";

export default function Timer(options) {
  this.x = 3;
  this.f = options.f;
}
Timer.prototype = {
  f: "src proto",
};

const t = Object.create(Timer.prototype);
t.constructor = Timer;

const w = new Proxy(t, {});

Timer.call(w, { f: "f" });

console.log(t);
console.log(Object.getPrototypeOf(t));
console.log(t instanceof Timer);

console.log(t.constructor.name);
