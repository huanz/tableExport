module.exports = function (tableId, filename, type) {
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
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
    var typeMap = {
        /* txt:start */
        txt: require('./csv'),
        /* txt:end */
        /* csv:start */
        csv: require('./csv'),
        /* csv:end */
        /* xml:start */
        xml: require('./xml'),
        /* xml:end */
        /* doc:start */
        doc: require('./office'),
        /* doc:end */
        /* xls:start */
        xls: require('./office'),
        /* xls:end */
        /* image:start */
        image: require('./image'),
        /* image:end */
        /* pdf:start */
        pdf: require('./pdf'),
        /* pdf:end */
        docx: ''
    };
    var typeFunc = typeMap[type];
    if (typeof typeFunc === 'function') {
        if (type === 'image' || type === 'pdf') {
            typeFunc(table, filename);
        } else {
            var data = typeFunc(table, charset, type);
            require('file-saver').saveAs(new Blob([data], {
                type: uri[type]
            }), filename + '.' + type);
        }
    } else {
        throw new Error('the supported types are: json, txt, csv, xml, doc, xls, image, pdf');
    }
};