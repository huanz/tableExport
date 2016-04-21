var fs = require('fs');
var src = './src/index.js';
var md = ['json', 'txt', 'csv', 'xml', 'doc', 'xls', 'image', 'pdf'];
var modules = (process.env['MODULES'] || '').split(' ');
var notypes = [];
var noimg = false;
var nopdf = false;
var content = null;
if (modules[0]) {
    notypes = md.filter(function (m) {
        if (modules.indexOf(m) === -1) {
            if (m === 'image') {
                noimg = true;
            } else if (m === 'pdf') {
                nopdf = true;
            }
            return true;
        }else {
            return false;
        }
    });
}
if (notypes.length) {
    content = fs.readFileSync(src).toString();
    notypes.forEach(function (m) {
        var r = new RegExp('/\\*' + m + '-wrap\\*/([\\s\\S]+?)/\\*' + m + '-wrap\\*/', 'g');
        content = content.replace(r, '');
    });
    if (noimg && nopdf) {
        content = content.replace(/\/\*image-pdf-wrap\*\/([\s\S]+?)\/\*image-pdf-wrap\*\//g, '');
    } else if (noimg || nopdf) {
        content = content.replace(/\/\*type-if-wrap\*\/([\s\S]+?)\/\*type-if-wrap\*\//g, 'type === \'' + (noimg ? 'pdf' : 'image') + '\'');
    }
    src = './src/index-tmp.js';
    fs.writeFileSync(src, content);
    var callback = function () {
        fs.unlinkSync(src);
    };
    process.on('SIGINT', callback);
    process.on('uncaughtException', callback);
    process.on('exit', callback);
}

module.exports = {
    entry: src,
    output: {
        libraryTarget: 'umd',
        library: 'tableExport',
        path: './dist',
        filename: 'tableExport.js'
    }
};
