var saveAs = require('./saveAs');
var toCsv = require('./csv');
var toJSON = require('./json');
var toOffice = require('./office');

module.exports = global.tableExport = function (tableId, filename, type) {
    var doc = document;
    var table = doc.getElementById(tableId);
    var charset = doc.characterSet;
    var uri = {
        json: 'application/json;charset=' + charset,
        txt: 'csv/txt;charset=' + charset,
        csv: 'csv/txt;charset=' + charset,
        doc: 'application/msword',
        xls: 'application/vnd.ms-excel',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        pdf: 'application/pdf'
    };
    var typeMap = {
        json: toJSON,
        txt: toCsv,
        csv: toCsv,
        doc: toOffice,
        xls: toOffice
    };
    var data = typeMap[type](table, charset, type);
    if (data) {
        saveAs(new Blob([data], {
            type: uri[type]
        }), filename + '.' + type);
    } else {
        throw new Error('the supported types are: json, txt, csv, doc, xls');
    }
};
