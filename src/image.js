var saveAs = require('FileSaver.js/FileSaver').saveAs;
var dataURLtoBlob = require('JavaScript-Canvas-to-Blob');
var dom2canvas = require('./dom2canvas');

module.exports = function (table, filename) {
    dom2canvas(table, function (canvas) {
        canvas.toBlob(function (b) {
            saveAs(b, filename + '.png');
        });
    });
}