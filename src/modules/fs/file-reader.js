import { Readable } from "stream";

import fs from "fs";

import _ from "lodash";

import { EOL } from "os";

class FileReader extends Readable {
  constructor(options) {
    super({
      objectMode: true,
    });

    this.fileStream = fs.createReadStream(options?.path, {
      encoding: "utf-8",
    });

    this.delimiter = options?.delimiter ?? EOL;
  }

  // one or more object left from prev iteration
  // always non-empty string or null
  remainder = null;

  _read() {
    const chunk = this.fileStream.read();

    let result = null;

    while (true) {
        
    }

    if (this.remainder != null) {
      const nextDelimiterIndex = this.remainder.indexOf(this.delimiter);

      if (nextDelimiterIndex < 0) {
      }

      const body = this.remainder.substring(
        0,
        nextDelimiterIndex < 0 ? null : nextDelimiterIndex
      );

      result = this.parseObject(body);

      this.remainder =
        nextDelimiterIndex < 0 ||
        nextDelimiterIndex == this.remainder.length - 1
          ? null
          : this.remainder.substring(nextDelimiterIndex + 1);
    }

    return result;
  }

  parseObject(data) {
    return JSON.parse(data);
  }
}
