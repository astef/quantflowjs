export default function App(options) {
  this.options = options;
}

App.prototype = {
  def(ctor, name) {},

  init(name, ctorName, ...args) {},
  destroy(name) {},

  link(from, to) {},
  unlink(from, to) {},
};
