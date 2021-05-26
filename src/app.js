import _ from "lodash";
import { callConfigProp } from "./lib.js";

export default function App() {
    this.map = new Map();
}

function MethodConfig(fn, instance) {
    const method = fn.bind(instance);
    this.handle =
        fn.constructor.name === "AsyncFunction"
            ? method
            : (e) => {
                  return Promise.resolve(method(e));
              };
    this.subscriptions = [];
}

function CallConfig() {
    this.subscribers = [];
}
CallConfig.prototype.handle = function (e) {
    if (this.subscribers.length == 0) {
        return Promise.resolve();
    }
    if (this.subscribers.length == 1) {
        return this.subscribers[0].handle(e);
    }
    return Promise.all(this.subscribers.map((s) => s.handle(e)));
};

function InstanceConfig() {
    this.methods = {};
    this.calls = {};
}
InstanceConfig.prototype.defineMethod = function (name, fn, instance) {
    this.methods[name] = new MethodConfig(fn, instance);
};
InstanceConfig.prototype.defineCall = function (name, options) {
    return (this.calls[name] = new CallConfig());
};

App.prototype.init = function (ctor, options) {
    const instance = new ctor(options);
    const instanceConfig = new InstanceConfig();

    for (const prop in instance) {
        const value = instance[prop];
        if (!_.isFunction(value)) continue;

        if (!value[callConfigProp]) {
            // method
            instanceConfig.defineMethod(prop, value, instance);
            continue;
        }
        // call
        const callConfig = instanceConfig.defineCall(
            prop,
            _.defaults({}, value[callConfigProp])
        );
        instance[prop] = callConfig.handle.bind(callConfig);
    }

    this.map.set(instance, instanceConfig);

    return instance;
};

App.prototype.link = function (
    sourceObj,
    sourceCallName,
    targetObj,
    targetMethodName
) {
    const fromObjConfig = this.map.get(sourceObj);
    const fromCallConfig = fromObjConfig.calls[sourceCallName];

    const targetObjConfig = this.map.get(targetObj);
    const targetMethodConfig = targetObjConfig.methods[targetMethodName];

    fromCallConfig.subscribers.push(targetMethodConfig);
    targetMethodConfig.subscriptions.push(fromCallConfig);
};
