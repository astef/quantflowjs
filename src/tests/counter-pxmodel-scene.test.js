import test from "ava";

import runScript from "../core/run-script.js";

test("counter-pxmodel-scene", async (t) => {
    const result = await runScript({
        types: {
            Gen: "../tests/modules/gen.js",
            Log: "../tests/modules/log.js",
            Px: {
                path: "./patterns/px.js",
                name: "default",
            },
            Pipeline: "./patterns/pipeline.js",
            Hook: "./patterns/hook.js",
            Call: "./patterns/call.js",
        },
        nodes: {
            pipe: {
                type: "Pipeline",
                arg: [{ name: "ld", dropResult: true }, "o1", "o2"],
            },
            gen1: {
                type: "Gen",
                arg: { count: 3, data: { increment: 1 } },
            },
            gen2: {
                type: "Gen",
                arg: { count: 5, data: { increment: 2 } },
            },
            pxhook: {
                type: "Hook",
            },
            px: {
                type: "Px",
                arg: {
                    importPath: "../../tests/modules/px/model.js",
                    args: [{ value: 7 }],
                },
            },
            log: {
                type: "Log",
            },
        },
        links: [
            ["pipe", "ld", "px", "load"],
            ["pipe", "o1", "gen1", "execute"],
            ["pipe", "o2", "gen2", "execute"],
            ["gen1", "onData", "pxhook", "invoke"],
            ["gen2", "onData", "pxhook", "invoke"],
            ["pxhook", "notify", "log", "log"],
            ["pxhook", "handle", "px", "handle"],
        ],
        activation: ["pipe", "handle", 7],
    });
    t.is(result, 2);
});
