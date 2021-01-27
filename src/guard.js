import _ from "lodash";

function fail() {
  throw new Error("Guard assertion failed.");
}

/**
 * @param {number} value
 */
export function requiredNumber(value) {
  if (typeof value !== "number") {
    fail();
  }
}

/**
 * @param {number} value
 */
export function requiredFiniteNumber(value) {
  if (!Number.isFinite(value)) {
    fail();
  }
}

/**
 *
 * @param {boolean} arg
 */
export function isTrue(arg) {
  if (arg !== true) {
    fail();
  }
}

/**
 *
 * @param {any} arg
 */
export function isTruthy(arg) {
  if (!arg) {
    fail();
  }
}

/**
 *
 * @param {Date} date
 */
export function requiredDate(date) {
  if (!_.isDate(date)) {
    fail();
  }
}
