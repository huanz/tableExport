var utils = require('./utils');
module.exports = function (table) {
    var jsonHeaderArray = [];
    var jsonArray = [];
    if (table.tHead) {
        for (var i = 0, col; col = table.tHead.rows[0].cells[i]; i++) {
            jsonHeaderArray.push(utils.getText(col));
        }
    }
    if (table.tBodies) {
        for (var j = 0, tbody; tbody = table.tBodies[j]; j++) {
            for (var k = 0, rowb; rowb = tbody.rows[k]; k++) {
                var len = jsonArray.length;
                jsonArray[len] = [];
                for (var g = 0, colb; colb = rowb.cells[g]; g++) {
                    jsonArray[len].push(utils.getText(colb));
                }
            }
        }
    }

    return JSON.stringify({
        header: jsonHeaderArray,
        data: jsonArray
    });
}