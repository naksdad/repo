var params = function() {
    this.url;
    this.sheets;
}

var err = function(message) {
    this.errMessage = message;
}

var retrieveExcelDataFromURL = function(params, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", params.url, true);
    req.timeout = 2000;
    req.responseType = "arraybuffer";

    req.onload = function() {
        _onloadCallback(req, params, callback);
    }

    req.ontimeout = function() {
        _ontimeoutCallback(req.timeout, callback);
    }

    req.send();
}

function _onloadCallback(request, params, callback) {
    if (request.status == 200 || request.status == 201) {
        var data = new Uint8Array(request.response);

        var arr = new Array();
        for (var i = 0; i < data.length; i++) {
            arr[i] = String.fromCharCode(data[i]);
        }

        var workbook = XLSX.read(arr.join(""), { type: 'binary' });

        ret = new Array();
        params.sheets.forEach(function(sheet) {
            var worksheet = workbook.Sheets[sheet.name];
            ret.push(XLSX.utils.sheet_to_json(worksheet));
        });

        (ret.length >= 1) ? callback(ret) : callback(new err("No item extracted"));
    } else {
        callback(new err("URL not available : " + params.url));
    }
}

function _ontimeoutCallback(timeout, callback) {
    callback(new err("Timeout : " + timeout));
}