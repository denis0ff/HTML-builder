const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });
const file = fs.createWriteStream(path.join(__dirname, "text.txt"), "utf8");

console.log(
  `\nPlease, enter smth to add to text.txt file. If you want to conclude the input, please enter 'exit' or push Ctrl+C \n`
);

process.on("exit", () => {
  console.log(`\nThe input is finished. File record complete.\n`);
});

rl.on("line", (line) => {
  if (line.toLowerCase() == "exit") {
    rl.close();
  } else {
    file.write(line + "\n");
  }
});
