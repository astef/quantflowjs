import { defineCall } from "../lib.js";

export default function Hook() {
    this.handle = defineCall();
    this.notify = defineCall();
}

Hook.prototype.invoke = async function (e) {
    const res = await this.handle(e);
    await this.notify(res);
    return res;
};
