import { defineCall } from "../lib.js";

export default function Gen(options) {
    this.count = options.count;
    this.data = options.data;
    this.onData = defineCall();
}

Gen.prototype.execute = async function (n) {
    for (let index = 0; index < this.count; index++) {
        await this.onData(this.data);
    }
    return n + 1;
};
