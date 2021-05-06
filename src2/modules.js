export const isCallback = Symbol("isCallback");

export function defineCallback() {
    return (event) => {};
}
