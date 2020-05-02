var join = require('path').join
var config = require('./config')
var utils = require('./libs/utils')
var formidable = require('formidable')
var fs = require('fs')

let app = config.app;

//设置模板后缀名
['html', 'css', 'png', 'jpg', 'jpeg', 'xml', 'js', 'gif'].forEach(function (item, index) {
    app.engine(item, require('express-art-template'))
})

//配置模板所在文件夹名
app.set('views', join('nodeApi/templates'))

app.post('/templateList', function (req, res) {
    let path = req.body.path ? req.body.path : 'nodeApi/templates'
    let files = utils.getJsonFiles(path)
    res.send(files)
})

app.post('/editTempate', function (req, res) {
    res.render(req.body.path)
})

app.post('/writeTemplate', function (req, res) {
    fs.writeFile('nodeApi/templates/' + req.body.savePath, req.body.html, 'utf-8', function (err) {
        if (err) {
            res.send({ msg: '文件编辑失败', data: false });
        } else {
            res.send({ msg: '编辑成功', data: true });
        }
    })
})

app.post('/delTemplate', function (req, res) {
    fs.unlink(req.body.oldPath, function (err) {
        if (err) {
            res.send({ msg: '文件删除失败', data: false });
        } else {
            res.send({ msg: '文件删除成功', data: true });
        }

    })
})

app.post('/uploadFile', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log(JSON.stringify({ fields, files }))
        res.end(JSON.stringify({ fields, files }))
    })
})

