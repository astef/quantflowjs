import { Price } from "./market-primitives";

export function Session() {
  this.lol = "kek";
}

/**
 * @param {Price} price
 * */
export function Tick(serverTime) {
  this.price = price;
}

/**
 * @param {Price} price
 * */
export function Deal(moment, price) {
  this.price = price;
}

export function SessionEnd(moment) {
  this.semoment = moment;
  this.meth = () => {};
}