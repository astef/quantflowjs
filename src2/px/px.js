import { defineCallback } from "../modules.js";

export default function Px(options) {
    this.options = options;

    this.onReady = defineCallback({ activate: true });
    this.onData = defineCallback();
    this.onEnd = defineCallback({ deactivate: true });

    this.proxy = new Proxy(
        {},
        {
            set: (target, p, value, receiver) => {
                console.log(`${p} = ${value}`);
                return Reflect.set(target, p, value, receiver);
            },
            defineProperty: (target, p, attributes) => {
                // console.log(`Defining: ${p}`);
                return Reflect.defineProperty(target, p, attributes);
            },
            setPrototypeOf(target, v) {
                // console.log(`setPrototypeOf`);
                return Reflect.setPrototypeOf(target, v);
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

        this.onData({});
    });
};

Px.prototype.handle = function (e) {
    this.proxy.handle(e);
    this.onData({});
};
