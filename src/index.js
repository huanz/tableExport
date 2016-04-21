module.exports = function (tableId, filename, type) {
    var doc = document;
    var table = doc.getElementById(tableId);
    var charset = doc.characterSet;
    var uri = {
        /*json-wrap*/
        json: 'application/json;charset=' + charset,
        /*json-wrap*/
        /*txt-wrap*/
        txt: 'csv/txt;charset=' + charset,
        /*txt-wrap*/
        /*csv-wrap*/
        csv: 'csv/txt;charset=' + charset,
        /*csv-wrap*/
        /*xml-wrap*/
        xml: 'application/xml',
        /*xml-wrap*/
        /*doc-wrap*/
        doc: 'application/msword',
        /*doc-wrap*/
        /*xls-wrap*/
        xls: 'application/vnd.ms-excel',
        /*xls-wrap*/
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
    var typeMap = {
        /*json-wrap*/
        json: require('./json'),
        /*json-wrap*/
        /*txt-wrap*/
        txt: require('./csv'),
        /*txt-wrap*/
        /*csv-wrap*/
        csv: require('./csv'),
        /*csv-wrap*/
        /*xml-wrap*/
        xml: require('./xml'),
        /*xml-wrap*/
        /*doc-wrap*/
        doc: require('./office'),
        /*doc-wrap*/
        /*xls-wrap*/
        xls: require('./office'),
        /*xls-wrap*/
        /*image-wrap*/
        image: require('./image'),
        /*image-wrap*/
        /*pdf-wrap*/
        pdf: require('./pdf'),
        /*pdf-wrap*/
        docx: ''
    };
    var typeFunc = typeMap[type];
    if (typeof typeFunc === 'function') {
        /*image-pdf-wrap*/
        if (/*type-if-wrap*/type === 'image' || type === 'pdf'/*type-if-wrap*/) {
            typeFunc(table, filename);
        } else {
        /*image-pdf-wrap*/
            var data = typeFunc(table, charset, type);
            require('FileSaver.js/FileSaver').saveAs(new Blob([data], {
                type: uri[type]
            }), filename + '.' + type);
        /*image-pdf-wrap*/
        }
        /*image-pdf-wrap*/
    } else {
        throw new Error('the supported types are: json, txt, csv, xml, doc, xls, image, pdf');
    }
};
