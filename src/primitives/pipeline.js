import { defineCall } from "../lib.js";

export default function Pipeline(destinationNames) {
    this._destinationNames = destinationNames;
    for (const n of destinationNames) {
        this[n] = defineCall();
    }
}

Pipeline.prototype.handle = async function (e) {
    let result = e;
    for (const n of this._destinationNames) {
        result = await this[n](result);
    }
    return result;
};
