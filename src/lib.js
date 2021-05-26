import _ from "lodash";

export const callConfigProp = Symbol("callConfig");

export function defineCall(config) {
    const result = (e) => {
        return Promise.resolve();
    };
    result[callConfigProp] = _.defaults({}, config);
    return result;
}
