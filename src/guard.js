export default {
  requiredNumber(arg) {},

  requiredIntegerNumber() {
    arguments.forEach((arg) => {
      //..
    });
  },

  requiredString(arg) {},

  isTrue(arg) {
    if (!arg) {
      throw new Error("Guard assertion failed.");
    }
  },
};
