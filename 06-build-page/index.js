const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

let template;

fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, data) => {
  if (err) throw err;
  template = data;
  bundleProject();
});

async function bundleProject() {
  const componentsSrc = path.join(__dirname, "components");
  fs.readdir(componentsSrc, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    copyAssets(
      path.join(__dirname, "assets"),
      path.join(__dirname, "project-dist", "assets")
    );

    mergeStyles(
      path.join(__dirname, "styles"),
      path.join(__dirname, "project-dist", "style.css")
    );

    replaceComponents(componentsSrc, files);
  });
}

async function replaceComponents(componentsSrc, files) {
  files.forEach((file) => {
    const componentPath = path.join(componentsSrc, file.name);
    const component = `{{${path.basename(
      componentPath,
      path.extname(componentPath)
    )}}}`;
    if (
      template.includes(component) &&
      path.extname(componentPath) === ".html"
    ) {
      fs.readFile(componentPath, "utf-8", (err, data) => {
        if (err) throw err;

        template = template.replace(component, data);
        const file = fs.createWriteStream(
          path.join(__dirname, "project-dist", "index.html")
        );
        file.write(template);
      });
    }
  });
}

async function copyAssets(src, dest) {
  const entries = await fsp.readdir(src, { withFileTypes: true });
  await fsp.rm(dest, { force: true, recursive: true });
  await fsp.mkdir(dest, { recursive: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyAssets(srcPath, destPath);
    } else {
      await fsp.copyFile(srcPath, destPath);
    }
  }
}

async function mergeStyles(src, dest) {
  let style = "";

  fs.readdir(src, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = path.join(src, file.name);
      if (file.isFile() && path.extname(filePath) == ".css") {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) throw err;
          style += data;
          const file = fs.createWriteStream(dest, "utf8");
          file.write(style);
        });
      }
    });
  });
}
