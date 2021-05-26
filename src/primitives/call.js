import { defineCall } from "../lib.js";

export default function Call() {
    this.handle = defineCall();
}

Call.prototype.invoke = function (e) {
    return this.handle(e);
};
