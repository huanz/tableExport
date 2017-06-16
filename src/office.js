var utils = require('./utils');
module.exports = function (table, charset, type) {
    var tpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:{{type}}" xmlns="http://www.w3.org/TR/REC-html40">';
    tpl += '<head><meta charset="{{charset}}" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>';
    tpl += '表格1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
    tpl += '</head><body><table>{{table}}</table></body></html>';

    var office = '';
    var maph = [
        ['<thead><tr>', '</tr></thead>'],
        ['<tbody><tr>', '</tr></tbody>'],
        ['<tr>', '</tr>']
    ];
    var mapb = [
        ['<th>', '</th>'],
        ['<td style="vnd.ms-excel.numberformat:@">', '</td>']
    ];
    var flag = +!table.tHead;
    var com = 1 - flag;

    for (var i = 0, row; row = table.rows[i]; i++) {
        flag = i > com ? 2 : flag;
        office += maph[flag][0];
        for (var j = 0, col; col = row.cells[j]; j++) {
            office += mapb[+!!flag][0] + utils.getText(col) + mapb[+!!flag][1];
        }
        office += maph[flag][1];
        flag++;
    }
    return utils.template(tpl, {
        charset: charset,
        type: type,
        table: office
    });
}