import { defineCallback } from "../modules.js";

export default function Query(options) {
    this.count = options.count;
    this.data = options.data;

    this.onData = defineCallback();
    this.onEnd = defineCallback({ deactivate: true });
}

Query.prototype.execute = function () {
    for (let index = 0; index < this.count; index++) {
        this.onData(this.data);
    }
    this.onEnd();
};
