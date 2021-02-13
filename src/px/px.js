export default function Px(options, callback) {
  this.options = options;
  this.callback = callback;

  this.proxyHandler = {
    // getPrototypeOf? (target: T): object | null;
    // setPrototypeOf? (target: T, v: any): boolean;
    // isExtensible? (target: T): boolean;
    // preventExtensions? (target: T): boolean;
    // getOwnPropertyDescriptor? (target: T, p: PropertyKey): PropertyDescriptor | undefined;
    // has? (target: T, p: PropertyKey): boolean;
    // get? (target: T, p: PropertyKey, receiver: any): any;
    // set? (target: T, p: PropertyKey, value: any, receiver: any): boolean;
    // deleteProperty? (target: T, p: PropertyKey): boolean;
    // defineProperty? (target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean;
    // enumerate? (target: T): PropertyKey[];
    // ownKeys? (target: T): PropertyKey[];
    // apply? (target: T, thisArg: any, argArray?: any): any;
    // construct? (target: T, argArray: any, newTarget?: any): object;
  };

  // init subject
  this.subject = Object.create(options.type.prototype);
  this.subject.constructor = options.type;

  // init proxy
  this.proxy = new Proxy(this.subject, this.proxyHandler);

  // construct subject via proxy
  options.type.call(this.proxy, options.subjectOptions, callback);
}

Px.prototype = {
  process(e) {},

  close() {},
};
