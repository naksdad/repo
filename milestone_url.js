var getMilestoneFromURL = function(params) {
    return new Promise(function(resolve, reject) {
        retrieveExcelDataFromURL(params, function(ret) {
            if (ret instanceof err) {
                reject(ret.errMessage);
            } else {
                var data = new Array();
                ret.forEach(function(aSheetRows) {
                    for (var i = 0; i < aSheetRows.length; i++) {
                        if (i == 0) continue;
                        data.push([
                            aSheetRows[i].Project,
                            aSheetRows[i].Event,
                            new Date(aSheetRows[i].Start),
                            new Date(aSheetRows[i].End)
                        ]);
                    }
                });
                resolve(data);
            }
        });
    });
}