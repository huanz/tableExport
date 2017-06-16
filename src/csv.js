var utils = require('./utils');
var fixCSVField = function (value) {
    return '\t"' + value.replace(/"/g, '""') + '"';
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