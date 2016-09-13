# tableExport.js #

`table`导出文件，支持导出`json`、`txt`、`csv`、`xml`、`doc`、`xls`、`image`、 `pdf`。

# usage #

```javascript
// dom id, filename, type: json, txt, csv, xml, doc, xsl, image, pdf
tableExport('table1', 'test', 'image');
```

# build #

```bash
git clone git@github.com:huanz/tableExport.git
cd tableExport
npm i

// 开发
npm run dev

// 构建个人版本
MODULES='doc xls image' npm run build
```
