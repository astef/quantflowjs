import { MongoClient } from "mongodb";
import { defineCallback } from "../modules.js";

export default function Db(options) {
    // fields
    this.options = options;
    // const uri = "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
    this.client = new MongoClient(options.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // events
    this.onReady = defineCallback({ activate: true });
    this.onLog = defineCallback({ diag: true });
    this.onError = defineCallback({ error: true });
    this.closed = defineCallback({ deactivate: true });

    // activation
    this.client.connect((err, _) => {
        if (err) {
            this.onError(err);
        }
        if (res) {
            this.onLog(res);
        }
    });
}

Db.prototype.push = function (e) {
    const db = this.client.db(this.options.db);
    const cl = db.collection(this.options.cl);

    cl.insertOne(e, (err, res) => {
        if (err) {
            this.onError(err);
        }
        if (res) {
            this.onLog(res);
        }

    });
};

Db.prototype.close = function () {};
