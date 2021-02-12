export function Shutdown() {}
Shutdown.prototype = {};

export function Message(source, targets, payload) {
  this.source = source;
  this.targets = targets;
  this.payload = payload;
}
Message.prototype = {};
