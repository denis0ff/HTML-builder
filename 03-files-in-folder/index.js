const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, files) => {
    console.log(`\n"secret-folder" directory files:`);
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        const filePath = path.join(__dirname, "secret-folder", file.name);
        if (file.isFile()) {
          let fileInfo = `${path.basename(
            filePath,
            path.extname(filePath)
          )} - ${path.extname(filePath).slice(1)} - `;
          fs.stat(filePath, (err, stats) => {
            console.log(fileInfo + stats.size + " bytes");
          });
        }
      });
    }
  }
);
