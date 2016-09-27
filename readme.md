# tableExport.js

`table`导出文件，支持导出`json`、`txt`、`csv`、`xml`、`doc`、`xls`、`image`、 `pdf`。

## usage

```javascript
// dom id, filename, type: json, txt, csv, xml, doc, xsl, image, pdf
tableExport('table1', 'test', 'image');
```

## build

```bash
git clone git@github.com:huanz/tableExport.git
cd tableExport
npm i

// 开发
npm run dev

// 构建个人版本
MODULES='doc xls image' npm run build
```

## browsers

| Browser        | Constructs as | Filenames    | Max Blob Size | Dependencies |
| -------------- | ------------- | ------------ | ------------- | ------------ |
| Firefox 20+    | Blob          | Yes          | 800 MiB       | None         |
| Firefox < 20   | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Chrome         | Blob          | Yes          | [500 MiB][3]  | None         |
| Chrome for Android | Blob      | Yes          | [500 MiB][3]  | None         |
| Edge           | Blob          | Yes          | ?             | None         |
| IE 10+         | Blob          | Yes          | 600 MiB       | None         |
| Opera 15+      | Blob          | Yes          | 500 MiB       | None         |
| Opera < 15     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |
| Safari 6.1+*   | Blob          | No           | ?             | None         |
| Safari < 6     | data: URI     | No           | n/a           | [Blob.js](https://github.com/eligrey/Blob.js) |

