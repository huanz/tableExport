

(function($){

	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var fromCharCode = String.fromCharCode;
	var INVALID_CHARACTER_ERR = ( function() {
        // fabricate a suitable error object
        try {
            document.createElement('$');
        } catch (error) {
            return error;
        }
    }());

	// encoder
	var btoa = function(string) {
	    var a, b, b1, b2, b3, b4, c, i = 0, len = string.length, max = Math.max, result = '';

	    while (i < len) {
	        a = string.charCodeAt(i++) || 0;
	        b = string.charCodeAt(i++) || 0;
	        c = string.charCodeAt(i++) || 0;

	        if (max(a, b, c) > 0xFF) {
	            throw INVALID_CHARACTER_ERR;
	        }

	        b1 = (a >> 2) & 0x3F;
	        b2 = ((a & 0x3) << 4) | ((b >> 4) & 0xF);
	        b3 = ((b & 0xF) << 2) | ((c >> 6) & 0x3);
	        b4 = c & 0x3F;

	        if (!b) {
	            b3 = b4 = 64;
	        } else if (!c) {
	            b4 = 64;
	        }
	        result += characters.charAt(b1) + characters.charAt(b2) + characters.charAt(b3) + characters.charAt(b4);
	    }
	    return result;
	};

	// decoder
	var atob = function(string) {
	    string = string.replace(/=+$/, '');
	    var a, b, b1, b2, b3, b4, c, i = 0, len = string.length, chars = [];

	    if (len % 4 === 1)
	        throw INVALID_CHARACTER_ERR;

	    while (i < len) {
	        b1 = characters.indexOf(string.charAt(i++));
	        b2 = characters.indexOf(string.charAt(i++));
	        b3 = characters.indexOf(string.charAt(i++));
	        b4 = characters.indexOf(string.charAt(i++));

	        a = ((b1 & 0x3F) << 2) | ((b2 >> 4) & 0x3);
	        b = ((b2 & 0xF) << 4) | ((b3 >> 2) & 0xF);
	        c = ((b3 & 0x3) << 6) | (b4 & 0x3F);

	        chars.push(fromCharCode(a));
	        b && chars.push(fromCharCode(b));
	        c && chars.push(fromCharCode(c));
	    }
	    return chars.join('');
	};


	$.fn.tableExport = function(anchor, type){
		var uri = {
			json: 'data:application/json;base64,',
			txt: 'data:csv/txt;charset=utf-8,',
			csv: 'data:csv/txt;charset=utf-8,\ufeff',
			doc: 'data:application/vnd.ms-doc;base64,', 
			excel: 'data:application/vnd.ms-excel;base64,', 
		};

		var $table = $(this),
			table = $table[0];

		var base64 = function(s) {
        	return btoa(unescape(encodeURIComponent(s)));
    	};
    	var template = function(s, c) {
        	return s.replace(/{(\w+)}/g, function(m, p) {
            	return c[p];
        	});
    	};

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

		var toCSV = function(){
			var data = "";
			for (var i = 0, row; row = table.rows[i]; i++) {
	            for (var j = 0, col; col = row.cells[j]; j++) {
	                data = data + (j ? ',' : '') + fixCSVField(col.innerHTML);
	            }
	            data = data + "\r\n";
	        }
			var blob = new Blob(['\ufeff'+data], { type: 'text/csv,charset=utf-8'});
			var hrefvalue = URL.createObjectURL(blob);

	        /*var hrefvalue = (to || uri.csv) + data;*/
	        anchor.href = hrefvalue;
            return true;
		};

		var toTxt = function(){
			//toCSV(uri.txt);
			toCSV();
		};

		var toJson = function(){
			var jsonHeaderArray = [];
			$table.find('thead').find('tr').each(function() {
				$(this).find('th').each(function(index) {
					jsonHeaderArray.push($.trim($(this).text()));									
				});	
			});
			var jsonArray = [];
			$table.find('tbody').find('tr').each(function() {
				$(this).find('td').each(function(index) {
					jsonArray.push($.trim($(this).text()));
				});	
			});
			var jsonExportArray = {
				header: jsonHeaderArray,
				data: jsonArray
			};
			var hrefvalue = uri.json + base64(JSON.stringify(jsonExportArray));
			anchor.href = hrefvalue;
            return true;
		};

		var toOffice = function(to){
			var tmpl = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:'+type+'" xmlns="http://www.w3.org/TR/REC-html40">';
			tmpl += '<head><meta charset="utf-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>';
			tmpl += '{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->';
  			tmpl += '</head><body><table>{table}</table></body></html>';

  			/*var excel="<table>";
  			$table.find('thead').find('tr').each(function() {
				excel += "<tr>";
				$(this).find('th').each(function(index) {
					excel += "<td>" + $.trim($(this).text()) + "</td>";	
				});	
				excel += '</tr>';						
			});					
			// Row Vs Column
			var rowCount=1;
			$table.find('tbody').find('tr').each(function() {
				excel += "<tr>";
				var colCount=0;
				$(this).find('td').each(function(index) {
					excel += "<td>"+ $.trim($(this).text()) +"</td>";
					colCount++;
				});															
				rowCount++;
				excel += '</tr>';
			});					
			excel += '</table>';*/

            var hrefvalue = to + base64(template(tmpl, {worksheet: 'Worksheet', table: $table.html()}));
            anchor.href = hrefvalue;
            return true;
		};

		var toDoc = function(){
			toOffice(uri.doc);
		};

		var toExcel = function(){
			toOffice(uri.excel);
		};

		var typeMap = {
			json : toJson,
			txt: toTxt,
			csv: toCSV,
			doc: toDoc,
			excel: toExcel
		};

		typeMap[type]();
	};
})(jQuery)