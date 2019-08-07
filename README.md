# QRSCP

![npm](https://img.shields.io/npm/v/@ffimnsr/qrscp?style=flat-square) ![npm](https://img.shields.io/npm/l/@ffimnsr/qrscp?style=flat-square) ![npm](https://img.shields.io/npm/dm/@ffimnsr/qrscp?style=flat-square)

<img src="https://leiningen.org/img/leiningen.jpg"
  alt="Leiningen logo" title="The man himself" align="right" />

> "The tools that you use shape how you look at the world."
> - by [Tim Ewald](https://youtu.be/ShEez0JkOFw?t=2502)

Quick QR file transfer over local connection.

## Commands

- `qrscp transfer <file>` - Generate QR image to transfer file.
- `qrscp receive <directory>` - Receive files using multipart upload.

## Installation

To install this command line tool:

~~~bash
npm install -g @ffimnsr/qrscp
~~~

## Credits

Inspired by project [qr-filetransfer](https://github.com/claudiodangelis/qr-filetransfer) which is implemented in Golang.

## License

MIT © ffimnsr
