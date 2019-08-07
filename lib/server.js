const interfaces = require("os").networkInterfaces();
const inquirer = require("inquirer");
const express = require("express");
const morgan = require("morgan");
const qrcode = require("qrcode-terminal");
const shortid = require("shortid");
const app = express();

const constants = require("./constants");

const interfaceAddresses = {};

async function getInterfaceAddress() {
  Object.keys(interfaces).forEach(ifname => {
    let alias = 0;

    interfaces[ifname].forEach(iface => {
      // Skip internal interfaces and non-ipv4 addresses.
      if (iface.family !== "IPv4" || iface.internal !== false) {
        return;
      }

      if (alias < 1) {
        interfaceAddresses[ifname] = iface.address;
      }

      ++alias;
    });
  });

  const { ifname } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose the interface you would like to use?",
      name: "ifname",
      choices: Object.keys(interfaceAddresses)
    }
  ]);

  return interfaceAddresses[ifname];
}

function generateQRcode(url) {
  qrcode.generate(url, { small: true }, qr => {
    console.log(`\n\nURL: ${url}`);
    console.log("Scan the code below in order to proceed.");
    console.log(qr);
    console.log("Press Ctrl+c to cancel the transfer.\n\n");
  });
}

function serve({ type, source, port = 0 }) {
  let clave = shortid.generate();

  app.use(morgan("combined"));

  if (type === constants.FILE) {
    app.get(`/${clave}`, (req, res) => {
      res.sendFile(source);
      console.log(`Sent file: ${source}`);
    });
  }

  if (type === constants.DIRECTORY) {
    app.get(`/${clave}`, (req, res) => {});
  }

  getInterfaceAddress().then(address => {
    const server = app.listen(port, address, () => {
      const live = `http://${server.address().address}:${
        server.address().port
      }/${clave}`;
      generateQRcode(live);
    });
  });
}

module.exports = serve;
