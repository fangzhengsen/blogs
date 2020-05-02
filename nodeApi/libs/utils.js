var join = require('path').join
var fs = require('fs')

function getJsonFiles(jsonPath) {
    let jsonFiles = [];
    function findJsonFile(path) {
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path, item);
            let stat = fs.statSync(fPath);
            let dirOrFile = {};
            dirOrFile.oldPath = fPath;
            dirOrFile.path = fPath.replace(/nodeApi\\templates\\/, '')
            if (stat.isDirectory() === true) {
                dirOrFile.fileType = 'dir'
                jsonFiles.unshift(dirOrFile);
            }
            if (stat.isFile() === true) {
                dirOrFile.fileType = 'file'
                jsonFiles.push(dirOrFile)
            }

        });
    }
    findJsonFile(jsonPath);
    return jsonFiles;
}

exports.getJsonFiles = getJsonFiles