var join = require('path').join
var config = require('./config')
var utils = require('./libs/utils')
var fs = require('fs')

let app = config.app;
//设置模板后缀名
app.engine('html', require('express-art-template'))

//配置模板所在文件夹名
app.set('views', join('templates'))


app.post('/templateList', function (req, res) {
    let path = req.body.path ? req.body.path : 'nodeApi/templates'
    let files = utils.getJsonFiles(path)
    res.send(files)
})

app.post('/editTempate', function (req, res) {
    fs.readFile(join(req.body.oldPath), function (err, data) {
        res.end(data.toString())
    })
})


