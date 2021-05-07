import _ from "lodash";

export const callbackConfigProp = Symbol("callbackConfig");

export function defineCallback(config) {
    const result = (e) => {};
    result[callbackConfigProp] = _.defaults({}, config);
    return result;
}
