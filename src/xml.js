var utils = require('./utils');
module.exports = function (table) {
    var xml = '<?xml version="1.0" encoding="utf-8"?><table>';
    for (var i = 0, row; row = table.rows[i]; i++) {
        xml += '<row id="' + i + '">';
        for (var j = 0, col; col = row.cells[j]; j++) {
            xml += '<column>' + utils.getText(col) + '</column>';
        }
        xml += '</row>';
    }
    xml += '</table>';
    return xml;
}