export default function App() {
    this.map = new Map();
}

App.prototype.init = function (ctor, options) {
    const instance = ctor(options);
    // register methods

    // register events, handle activation/deactivation
    this.map.set(instance, {});
    
    return instance;
};

App.prototype.link = function (fromObj, fromEvent, toObj, toMethod) {
    // subscribe events
};
