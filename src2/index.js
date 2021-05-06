import App from "./app.js";

const app = new App();

// LOAD PHASE
import Query from "./query/query.js";
import Px from "./px/px.js";

// INIT PHASE
const q1 = app.init(Query, { count: 3, data: 1 });

const q2 = app.init(Query, { count: 5, data: 2 });

const px = app.init(Px, {
    importPath: "./model.js",
    args: [{ value: 7 }],
});

// LINK PHASE

app.link(px, "onReady", q1, "execute");

app.link(q1, "onData", px, "handle");
app.link(q1, "onEnd", q2, "execute");

app.link(q2, "onData", px, "handle");

// ACTIVATION PHASE
px.load();
