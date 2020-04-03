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
            if (stat.isDirectory() === true) {
                dirOrFile.fileType = 'dir'
            }
            if (stat.isFile() === true) {
                dirOrFile.fileType = 'file'
            }
            dirOrFile.oldPath = fPath;
            dirOrFile.path = fPath.replace(/nodeApi/, '')
            jsonFiles.unshift(dirOrFile);
        });
    }
    findJsonFile(jsonPath);
    return jsonFiles;
}

exports.getJsonFiles = getJsonFiles