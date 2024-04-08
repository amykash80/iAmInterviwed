import React, { useState } from "react";
class EncodedUtils {
    getEncoded(input: string): string {
        let base64 = require("base-64");
        let utf8 = require("utf8");
        var text = JSON.stringify(input);
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes);
        return encoded;
    }

    getDecoded(input: string): string {
        let base64 = require("base-64");
        let utf8 = require("utf8");
        var text = JSON.stringify(input);
        var bytes = utf8.decoded(text);
        var decoded = base64.decoded(bytes);
        return decoded;
    }
}
const encodedUtils = new EncodedUtils();
export default encodedUtils;