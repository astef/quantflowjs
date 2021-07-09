import runScript from "./core/run-script.js";

import { readFileSync } from "fs";

const script = JSON.parse(readFileSync(process.argv[2], { encoding: "utf-8" }));

runScript(script);


