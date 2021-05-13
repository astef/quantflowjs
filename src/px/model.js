export default function Model(options) {
    this.value = options.value;
}

Model.prototype.handle = function (e) {
    this.value = this.value + e.increment;
};
