var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    multer  = require('multer'),
    postC = require('./src/api/controller/PostController'),
    userC = require('./src/api/controller/UserController');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.match(/.[a-z]{3,4}$/i)[0])
  }
})
var upload = multer({ storage: storage });



// 解析req.body数据
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/upload'));

// 解决跨域，开发环境时打开。要放在路径解析下面，否则会先读成json
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-File-Name');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

app.get('/feed', postC.feed , function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/xml'});
    var postData = res.data.map((item, key) => { 
        return ['<item>'
            ,        '<title>' +  item.post_title  + '</title>'
            ,           '<guid>http://116.62.202.146/view/' + item._id +'</guid>'
            ,            '<link>http://116.62.202.146/view/' + item._id + '</link>'
            ,            '<pubDate>' + new Date(item.post_date).toUTCString() + '</pubDate>'
            ,            '<description>' + item.post_desc + '</description>'
            ,           '<content:encoded><![CDATA[' + item.post_content + ']]></content:encoded>'
            ,   '</item>'].join('')
    })
    res.end([
        '<?xml version="1.0" encoding="UTF-8" ?>'
        ,    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">'
        ,       '<channel>'
        ,       '<atom:link href="http://116.62.202.146/feed" rel="self" type="application/rss+xml" />'
        ,        '<title><![CDATA[ Seven ]]></title>'
        ,         '<link>http://116.62.202.146/feed</link>'
        ,         '<description>seven blogs</description>'
        ,               postData.join('') +  '</channel>'
        ,    '</rss>'
    ].join(''));
})
app.get ('/api/archives', function (req, res) { postC.list(req, res) })
app.get ('/api/detail'  , function (req, res) { postC.view(req, res) })
app.get ('/api/search'  , function (req, res) { postC.search(req, res) })
app.get('/api/user', function (req, res) { userC.view(req, res) })

app.post('/api/create', function (req, res) { postC.create(req, res) })
app.post('/api/update', function (req, res) { postC.update(req, res) })
app.post ('/api/delete', function (req, res) { postC.delete(req, res) })
app.post('/api/login', function (req, res) { userC.login(req, res) })
app.post('/api/user/update', function (req, res) { userC.update(req, res) })


app.post('/upload', upload.single('file'), function(req, res){
    res.send({
        'success': true,
        'msg': '成功', 
        'file_path': '/upload/' + req.file.filename
    })
});

// 为了browserHistory
app.get('*', function (req, res) { 
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3001);
