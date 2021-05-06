import { Readable } from "stream";

import fs from "fs";

class JsonReader extends Readable {
  constructor(options) {
    super({
      objectMode: true,
    });
    this.options = options;

    const rs = fs.createReadStream("");
    rs.read
  }

  _read() {}
}
