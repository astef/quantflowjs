import test from "ava";
import * as guard from "./guard.js";

test("isTrue_positive", (t) => {
  guard.isTrue(true);
  guard.isTrue("2" == 2);
  t.pass();
});

test("isTrue_negative", (t) => {
  t.throws(() => guard.isTrue(false));
  t.throws(() => guard.isTrue(0));
  t.throws(() => guard.isTrue(1));
  t.throws(() => guard.isTrue("0"));
  t.throws(() => guard.isTrue("1"));
  t.throws(() => guard.isTrue("true"));
  t.throws(() => guard.isTrue(""));
  t.throws(() => guard.isTrue(null));
  t.throws(() => guard.isTrue(undefined));
  t.throws(() => guard.isTrue("undefined"));
  t.throws(() => guard.isTrue({}));
  t.throws(() => guard.isTrue({ value: true }));
});

test("requiredNumber_positive", (t) => {
  guard.isNumber(0);
  guard.isNumber(-0);
  guard.isNumber(-1);
  guard.isNumber(1);
  guard.isNumber(19.0e64);
  guard.isNumber(-23.2222222);
  guard.isNumber(Number.EPSILON);
  guard.isNumber(-Number.EPSILON);
  guard.isNumber(Number.MIN_SAFE_INTEGER);
  guard.isNumber(Number.MAX_SAFE_INTEGER);
  guard.isNumber(Number.MIN_VALUE);
  guard.isNumber(Number.MAX_VALUE);
  guard.isNumber(Number.NaN);
  guard.isNumber(Number.NEGATIVE_INFINITY);
  guard.isNumber(Number.POSITIVE_INFINITY);
  t.pass();
});

test("requiredNumber_negative", (t) => {
  t.throws(() => guard.isNumber(new Number(0)));
  t.throws(() => guard.isNumber(new Number(0.42)));
  t.throws(() => guard.isNumber(undefined));
  t.throws(() => guard.isNumber(null));
  t.throws(() => guard.isNumber(true));
  t.throws(() => guard.isNumber("s"));
  t.throws(() => guard.isNumber("0"));
  t.throws(() => guard.isNumber({}));
  t.throws(() => guard.isNumber({ value: 1 }));
});

test("requiredFiniteNumber_positive", (t) => {
  guard.isFiniteNumber(0);
  guard.isFiniteNumber(Number(-0));
  guard.isFiniteNumber(-1);
  guard.isFiniteNumber(1);
  guard.isFiniteNumber(19.0e64);
  guard.isFiniteNumber(-23.2222222);
  guard.isFiniteNumber(Number.EPSILON);
  guard.isFiniteNumber(-Number.EPSILON);
  guard.isFiniteNumber(Number.MIN_SAFE_INTEGER);
  guard.isFiniteNumber(Number.MAX_SAFE_INTEGER);
  guard.isFiniteNumber(Number.MIN_VALUE);
  guard.isFiniteNumber(Number.MAX_VALUE);
  t.pass();
});

test("requiredFiniteNumber_negative", (t) => {
  t.throws(() => guard.isFiniteNumber(new Number(0)));
  t.throws(() => guard.isFiniteNumber(new Number(0.42)));
  t.throws(() => guard.isFiniteNumber(undefined));
  t.throws(() => guard.isFiniteNumber(null));
  t.throws(() => guard.isFiniteNumber(true));
  t.throws(() => guard.isFiniteNumber("s"));
  t.throws(() => guard.isFiniteNumber("0"));
  t.throws(() => guard.isFiniteNumber({}));
  t.throws(() => guard.isFiniteNumber({ value: 1 }));
  t.throws(() => guard.isFiniteNumber(Number.NaN));
  t.throws(() => guard.isFiniteNumber(Number.NEGATIVE_INFINITY));
  t.throws(() => guard.isFiniteNumber(Number.POSITIVE_INFINITY));
});
