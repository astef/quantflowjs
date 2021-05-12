import _ from "lodash";
import App from "./app.js";

function activate(script, nodes) {
    const [nodeName, method, arg] = script.activation;
    nodes[nodeName][method](arg);
}

function link(app, script, nodes) {
    for (const [fromNode, fromEvent, toNode, toMethod] of script.links) {
        app.link(nodes[fromNode], fromEvent, nodes[toNode], toMethod);
    }
}

function init(app, script, types) {
    const nodes = new Map();
    for (const key of Object.keys(script.nodes)) {
        const nodedef = script.nodes[key];
        const nodeType = types[nodedef.type];

        try {
            nodes[key] = app.init(nodeType, nodedef.arg);
        } catch (error) {
            console.error(`Error initializing node '${key}': ${error.message}`);
        }
    }

    return nodes;
}

function load(script) {
    const types = new Map();
    const typeLoadPromises = [];
    for (const key of Object.keys(script.types)) {
        const typedef = script.types[key];
        let modulePath, typeName;
        if (_.isString(typedef)) {
            modulePath = typedef;
            typeName = "default";
        } else {
            modulePath = typedef.path;
            typeName = typedef.name;
        }

        typeLoadPromises.push(
            import(modulePath).then(
                (m) => (types[key] = m[typeName]),
                (reason) => {
                    console.error(
                        `Error loading module '${modulePath}': '${reason}'`
                    );
                }
            )
        );
    }

    return Promise.all(typeLoadPromises).then((_) => {
        return types;
    });
}

export default async function runScript(script) {
    const types = await load(script);

    const app = new App();

    const nodes = init(app, script, types);

    link(app, script, nodes);

    activate(script, nodes);
}
