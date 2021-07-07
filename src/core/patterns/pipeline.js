import _ from "lodash";
import { defineCall } from "../lib.js";

export default function Pipeline(destinations) {
    this._destinations = [];
    for (const d of destinations) {
        if (_.isString(d)) {
            this[d] = defineCall();
            this._destinations.push({ name: d });
        } else {
            this[d.name] = defineCall();
            this._destinations.push(d);
        }
    }
}

Pipeline.prototype.handle = async function (e) {
    let result = e;
    for (const { name, dropResult } of this._destinations) {
        result = await this[name](result);
        if (dropResult) {
            result = undefined;
        }
    }
    return result;
};
