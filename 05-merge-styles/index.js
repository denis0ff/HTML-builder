const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "styles");
const dest = path.join(__dirname, "project-dist");

let style = '';

fs.readdir(src, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(src, file.name);
    if (file.isFile() && path.extname(filePath) == ".css") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;
        style += data;
        const file = fs.createWriteStream(
          path.join(dest, "bundle.css"),
          "utf8"
        );
        file.write(style);
      });
    }
  });
});
