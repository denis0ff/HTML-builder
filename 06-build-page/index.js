const fs = require("fs");
const path = require("path");

let template;

fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, data) => {
  if (err) throw err;
  template = data;
  findTemplates();
});

function findTemplates() {
  const componentsSrc = path.join(__dirname, "components");
  fs.readdir(componentsSrc, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const componentPath = path.join(componentsSrc, file.name);
      const component = `{{${path.basename(
        componentPath,
        path.extname(componentPath)
      )}}}`;
      if (
        template.includes(component) &&
        path.extname(componentPath) == ".html"
      ) {
        replaceComponents(component, componentPath, template);
      }
    });
  });

}

function replaceComponents(component, componentPath, template) {
  fs.readFile(componentPath, "utf-8", (err, data) => {
    if (err) throw err;
    template = template.replace(component, data);
  });
}
