import _ from "lodash";
import { callbackConfigProp } from "./modules.js";

export default function App() {
    this.map = new Map();
}

App.prototype.init = function (ctor, options) {
    const instance = new ctor(options);
    const instanceConfig = {
        activated: true,
        deactivated: false,
        methods: {},
        events: {},
    };

    for (const prop in instance) {
        const value = instance[prop];
        if (!_.isFunction(value)) continue;

        if (!value[callbackConfigProp]) {
            _.set(instanceConfig, `methods.${prop}`, { subscriptions: [] });
            continue;
        }

        const eventConfig = _.defaults({}, value[callbackConfigProp], {
            subscribers: [],
        });

        _.set(instanceConfig, `events.${prop}`, eventConfig);

        if (eventConfig.activate === true) {
            instanceConfig.activated = false;
        }

        instance[prop] = (e) => {
            // check for state violations
            if (instanceConfig.deactivated) {
                throw Error("Deactivated objects should not emit events.");
            }
            if (!instanceConfig.activated && !eventConfig.activate) {
                throw Error(
                    "Instance was not activated yet, so it can't emit non-activation event."
                );
            }

            // activate
            if (!instanceConfig.activated && eventConfig.activate) {
                instanceConfig.activated = true;
            }

            // deliver events
            for (const subscriber of eventConfig.subscribers) {
                if (!subscriber.instanceConfig.activated) {
                    continue;
                }
                subscriber.method(e);
            }

            // deactivate instance
            if (eventConfig.deactivate) {
                instanceConfig.activated = false;
                instanceConfig.deactivated = true;

                // unsubscribe this instance methods
                for (const methodConfig of _.values(instanceConfig.methods)) {
                    for (const subscription of methodConfig.subscriptions) {
                        _.remove(
                            subscription.eventConfig.subscribers,
                            (s) => s.methodConfig == methodConfig
                        );
                    }
                }

                // usubscribe this instance event subscribers
                for (const eventConfig of _.values(instanceConfig.events)) {
                    for (const subscriber of eventConfig.subscribers) {
                        _.remove(
                            subscriber.methodConfig.subscriptions,
                            (s) => s.eventConfig == eventConfig
                        );
                    }
                }
            }
        };
    }

    this.map.set(instance, instanceConfig);

    return instance;
};

App.prototype.link = function (
    sourceObj,
    sourceEventName,
    targetObj,
    targetMethodName
) {
    const fromObjConfig = this.map.get(sourceObj);
    const fromEventConfig = fromObjConfig.events[sourceEventName];
    const toObjConfig = this.map.get(targetObj);
    const toMethodConfig = toObjConfig.methods[targetMethodName];

    fromEventConfig.subscribers.push({
        method: _.bind(targetObj[targetMethodName], targetObj),
        instanceConfig: toObjConfig,
        methodConfig: toMethodConfig,
    });
    toMethodConfig.subscriptions.push({
        instanceConfig: fromObjConfig,
        eventConfig: fromEventConfig,
    });
};
