var utils = require('./utils');

var fixCSVField = function(value) {
    var fixedValue = value;
    var addQuotes = (value.indexOf(',') !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
    var replaceDoubleQuotes = (value.indexOf('"') !== -1);

    if (replaceDoubleQuotes) {
        fixedValue = fixedValue.replace(/"/g, '""');
    }
    if (addQuotes || replaceDoubleQuotes) {
        fixedValue = '"' + fixedValue + '"';
    }
    return fixedValue;
};


module.exports = function (table) {
    var data = '\ufeff';
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            data = data + (j ? ',' : '') + fixCSVField(utils.getText(col));
        }
        data = data + '\r\n';
    }
    return data;
}
