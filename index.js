#!/usr/bin/env node

"use strict";

const fs = require("fs");
const util = require("util");
const path = require("path");
const program = require("commander");
const chalk = require("chalk");
const envinfo = require("envinfo");
const packageJson = require("./package.json");
const serve = require("./lib/server");
const constants = require("./lib/constants");
const stat = util.promisify(fs.stat);

program
  .version(packageJson.version)
  .option("--verbose", "print additional logs")
  .option("--info", "print environment debug info")
  .on("--help", () => {
    console.log();
    console.log(`If you have any problems, do not hesitate to file an issue:`);
    console.log(`  ${chalk.cyan("https://github.com/ffimnsr/qrscp")}`);
    console.log();
  });

program
  .command("transfer <file>")
  .description("transfer the given file")
  .option("-p, --port [port]", "port to use in serving the file")
  .action((file, options) => {
    const port = options.port || 0;
    const source = path.resolve(file);

    stat(source)
      .then(stats => {
        if (stats.isFile()) {
          serve({
            source,
            port
          });
        }

        if (stats.isDirectory()) {
          console.log("Its a directory");
        }
      })
      .catch(console.log);
  })
  .on("--help", () => {
    console.log();
    console.log("Examples:");
    console.log("  qrscp transfer profile.png");
    console.log("  qrscp transfer --port 8080 profile.png");
    console.log();
  });

program
  .command("receive <directory>")
  .description("receive the transferred file to the given directory")
  .option("-p, --port [port]", "port to use in serving the file")
  .action((directory, options) => {
    const port = options.port || 0;
    const source = path.resolve(directory);

    stat(source)
      .then(stats => {
        if (stats.isDirectory()) {
          serve({
            action: constants.ACTION_RECEIVE,
            source,
            port
          });
        }

        if (stats.isFile()) {
          throw new Error("Specify a directory to receive file.");
        }
      })
      .catch(console.log);
  });

program.on("command:*", function() {
  console.error(
    "Invalid command: %s\nSee --help for list of available commands",
    program.args.join(" ")
  );
});

program.parse(process.argv);

if (program && typeof program.info !== "undefined") {
  console.log(`\n${chalk.bold("Environment Info:")}`);
  return envinfo
    .run(
      {
        System: ["OS", "CPU"],
        Binaries: ["Node", "npm", "Yarn"],
        Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
        npmGlobalPackages: ["qrscp"]
      },
      {
        duplicates: true,
        showNotFound: true
      }
    )
    .then(console.log);
}

if (program && program.args.length === 0) {
  program.help();
}
