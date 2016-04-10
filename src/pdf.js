var utils = require('./utils');
var jsPDF = require('./jspdf');

module.exports = function (table) {
    var pdf = new jsPDF('p','pt', 'a4', false);
    var startColPosition = 20;
    var startRowPosition = 20;
    var colPosition = 0;
    var rowPosition = 0;
    var page = 1;
    pdf.setFontSize(14);
    for (var i = 0, row; row = table.rows[i]; i++) {
        if ((i + 1) % 26 === 0){
            pdf.addPage();
            page++;
            startRowPosition = startRowPosition + 10;
        }
        rowPosition = startRowPosition + ((i + 1) * 10) - ((page -1) * 280);
        for (var j = 0, col; col = row.cells[j]; j++) {
            colPosition = startColPosition + (j * 50);
            pdf.text(utils.getText(col), colPosition, rowPosition);
        }
    }
    return pdf.output('arraybuffer');
}