import React, { useState } from "react";

const Base64 = (props: any) => {
    var base64 = require("base-64");
    var utf8 = require("utf8");
    var text = JSON.stringify(props.encoded);
    var bytes = utf8.encode(text);
    var encoded = base64.encode(bytes);
    // var bytes = base64.decode(encoded);
    // var text1 = utf8.decode(bytes);
    return <div className="App">{encoded}</div>;
};
export default Base64;