function fail() {
  throw new Error("Guard assertion failed.");
}

/**
 *
 * @param {Object} value
 * @param {Function} constructor
 */
export function isInstanceof(value, constructor) {
  if (value instanceof constructor) return;
  fail();
}

/**
 * @param {number} value
 */
export function isNumber(value) {
  if (typeof value === "number") return;
  fail();
}

/**
 * @param {number} value
 */
export function isFiniteNumber(value) {
  if (Number.isFinite(value)) return;
  fail();
}

/**
 *
 * @param {boolean} arg
 */
export function isTrue(arg) {
  if (arg === true) return;
  fail();
}

/**
 *
 * @param {any} arg
 */
export function isTruthy(arg) {
  if (arg) return;
  fail();
}

/**
 *
 * @param {Date} date
 */
export function isDate(date) {
  // todo check validitiy of the date
  if (date instanceof Date) return;
  fail();
}

