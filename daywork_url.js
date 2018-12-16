var getDayworkDataFromURL = function(params) {
    return new Promise(function(resolve, reject) {
        retrieveExcelDataFromURL(params, function(ret) {
            if (ret instanceof err) {
                reject(ret.errMessage);
            } else {
                var dayworkData = new Array();
                ret.forEach(function(aSheetRows) {
                    for (var i = 0; i < aSheetRows.length; i++) {
                        if (i == 0) continue;
                        dayworkData.push({
                            'date' : new Date(aSheetRows[i].Date),
                            'author' : aSheetRows[i].Author,
                            'project' : aSheetRows[i].Project,
                            'activity' : aSheetRows[i].Activity,
                            'time' : aSheetRows[i].Time
                        });
                    }
                });
                resolve(dayworkData);
            }
        });
    });
}