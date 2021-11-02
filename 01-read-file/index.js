const fs = require("fs");
const path = require("path");

const stream = fs.createReadStream(path.join(__dirname, "text.txt"), "utf8");

stream.on("error", (err) => reject(err));
stream.on("data", (chunk) => console.log(chunk));
