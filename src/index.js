var saveAs = require('FileSaver.js/FileSaver').saveAs;
var toCsv = require('./csv');
var toJSON = require('./json');
var toXml = require('./xml');
var toOffice = require('./office');
var toImage = require('./image');

module.exports = global.tableExport = function (tableId, filename, type) {
    var doc = document;
    var table = doc.getElementById(tableId);
    var charset = doc.characterSet;
    var uri = {
        json: 'application/json;charset=' + charset,
        txt: 'csv/txt;charset=' + charset,
        csv: 'csv/txt;charset=' + charset,
        xml: 'application/xml',
        doc: 'application/msword',
        xls: 'application/vnd.ms-excel',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        pdf: 'application/pdf'
    };
    var typeMap = {
        json: toJSON,
        txt: toCsv,
        xml: toXml,
        csv: toCsv,
        doc: toOffice,
        xls: toOffice
    };
    if (type === 'image') {
        toImage(table, filename);
    } else {
        try {
            var data = typeMap[type](table, charset, type);
            saveAs(new Blob([data], {
                type: uri[type]
            }), filename + '.' + type);
        } catch (e) {
            throw new Error('the supported types are: json, txt, csv, xml, doc, xls, image');
        }
    }
};
