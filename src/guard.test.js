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
  guard.requiredNumber(0);
  guard.requiredNumber(-0);
  guard.requiredNumber(-1);
  guard.requiredNumber(1);
  guard.requiredNumber(19.0e64);
  guard.requiredNumber(-23.2222222);
  guard.requiredNumber(Number.EPSILON);
  guard.requiredNumber(-Number.EPSILON);
  guard.requiredNumber(Number.MIN_SAFE_INTEGER);
  guard.requiredNumber(Number.MAX_SAFE_INTEGER);
  guard.requiredNumber(Number.MIN_VALUE);
  guard.requiredNumber(Number.MAX_VALUE);
  guard.requiredNumber(Number.NaN);
  guard.requiredNumber(Number.NEGATIVE_INFINITY);
  guard.requiredNumber(Number.POSITIVE_INFINITY);
  t.pass();
});

test("requiredNumber_negative", (t) => {
  t.throws(() => guard.requiredNumber(new Number(0)));
  t.throws(() => guard.requiredNumber(new Number(0.42)));
  t.throws(() => guard.requiredNumber(undefined));
  t.throws(() => guard.requiredNumber(null));
  t.throws(() => guard.requiredNumber(true));
  t.throws(() => guard.requiredNumber("s"));
  t.throws(() => guard.requiredNumber("0"));
  t.throws(() => guard.requiredNumber({}));
  t.throws(() => guard.requiredNumber({ value: 1 }));
});

test("requiredFiniteNumber_positive", (t) => {
  guard.requiredFiniteNumber(0);
  guard.requiredFiniteNumber(Number(-0));
  guard.requiredFiniteNumber(-1);
  guard.requiredFiniteNumber(1);
  guard.requiredFiniteNumber(19.0e64);
  guard.requiredFiniteNumber(-23.2222222);
  guard.requiredFiniteNumber(Number.EPSILON);
  guard.requiredFiniteNumber(-Number.EPSILON);
  guard.requiredFiniteNumber(Number.MIN_SAFE_INTEGER);
  guard.requiredFiniteNumber(Number.MAX_SAFE_INTEGER);
  guard.requiredFiniteNumber(Number.MIN_VALUE);
  guard.requiredFiniteNumber(Number.MAX_VALUE);
  t.pass();
});

test("requiredFiniteNumber_negative", (t) => {
  t.throws(() => guard.requiredFiniteNumber(new Number(0)));
  t.throws(() => guard.requiredFiniteNumber(new Number(0.42)));
  t.throws(() => guard.requiredFiniteNumber(undefined));
  t.throws(() => guard.requiredFiniteNumber(null));
  t.throws(() => guard.requiredFiniteNumber(true));
  t.throws(() => guard.requiredFiniteNumber("s"));
  t.throws(() => guard.requiredFiniteNumber("0"));
  t.throws(() => guard.requiredFiniteNumber({}));
  t.throws(() => guard.requiredFiniteNumber({ value: 1 }));
  t.throws(() => guard.requiredFiniteNumber(Number.NaN));
  t.throws(() => guard.requiredFiniteNumber(Number.NEGATIVE_INFINITY));
  t.throws(() => guard.requiredFiniteNumber(Number.POSITIVE_INFINITY));
});
