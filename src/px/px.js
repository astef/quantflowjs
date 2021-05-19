import { defineCallback } from "../lib.js";

export default function Px(options) {
    this.options = options;

    this.onReady = defineCallback({ activate: true });
    this.onChange = defineCallback();
    this.onEnd = defineCallback({ deactivate: true });

    this.delta = {};

    this.proxy = new Proxy(
        {},
        {
            set: (target, p, value, receiver) => {
                console.log(`${p} = ${value}`);
                this.delta[p] = value;
                return Reflect.set(target, p, value, receiver);
            },

            // default
            preventExtensions: (target) => {
                return Reflect.preventExtensions(target);
            },
            defineProperty: (target, p, attributes) => {
                return Reflect.defineProperty(target, p, attributes);
            },
            deleteProperty: (target, p) => {
                return Reflect.deleteProperty(target, p);
            },
            setPrototypeOf(target, v) {
                return Reflect.setPrototypeOf(target, v);
            },
            apply: (target, thisArg, argArray) => {
                return Reflect.apply(target, thisArg, argArray);
            },
            construct: (target, handler, newTarget) => {
                return Reflect.construct(target, handler, newTarget);
            },
            get: (target, p, receiver) => {
                return Reflect.get(target, p, receiver);
            },
            getOwnPropertyDescriptor: (target, p) => {
                return Reflect.getOwnPropertyDescriptor(target, p);
            },
            getPrototypeOf: (target) => {
                return Reflect.getPrototypeOf(target);
            },
            has: (target, p) => {
                return Reflect.has(target, p);
            },
            isExtensible: (target) => {
                return Reflect.isExtensible(target);
            },
            ownKeys: (target) => {
                return Reflect.ownKeys(target);
            },
        }
    );
}

Px.prototype.load = function () {
    import(this.options.importPath).then((m) => {
        const ctor = m[this.options.importName || "default"];

        Object.setPrototypeOf(this.proxy, ctor.prototype);

        this.instance = ctor.apply(this.proxy, this.options.args);
        this.onReady();

        this.onChange({});
    });
};

Px.prototype.handle = function (e) {
    this.proxy.handle(e);

    const deltaTmp = this.delta;
    this.delta = {};
    this.onChange(deltaTmp);
};
