import EventEmitter from "events";

const ee = new EventEmitter();

ee.on("myData", (d) => {
  console.log(`Received: ${d}`);
});

ee.emit("myData", "md1");
ee.emit("myData", "md2");
ee.emit("myData", "md3");
ee.emit("myData", "md4");

////////

// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype);

//If you don't set Rectangle.prototype.constructor to Rectangle,
//it will take the prototype.constructor of Shape (parent).
//To avoid that, we set the prototype.constructor to Rectangle (child).
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log(rect instanceof Rectangle);
console.log(rect instanceof Shape);
console.log(rect.prototype);
console.log(rect.constructor);
console.log(rect.constructor.prototype);

// for (const p in rect) {
//   console.log(p);
// }
