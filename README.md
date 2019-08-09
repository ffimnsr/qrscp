# QRSCP

![npm](https://img.shields.io/npm/v/@ffimnsr/qrscp?style=flat-square) ![npm](https://img.shields.io/npm/l/@ffimnsr/qrscp?style=flat-square) ![npm](https://img.shields.io/npm/dm/@ffimnsr/qrscp?style=flat-square)

<img src="https://raw.githubusercontent.com/ffimnsr/qrscp/master/docs/qrcode.png"
  alt="logo" title="qrcode" align="right" width="290" />

> Far out in the uncharted backwaters of the unfashionable end
> of the western spiral amr of the Galaxy lies a small,
> unregarded yellow sun.
> - from The Hitchhicker's Guide To The Galaxy by Douglas Adams

Quick QR file transfer over local connection.

## Commands

See `--help` for more info and commands.

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
