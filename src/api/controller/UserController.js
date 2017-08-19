var ObjectID = require('mongodb').ObjectID;
var Users = require('../model/users');

module.exports = { 
  login: function (req, res) {
    Users.findOne({username: req.body.username}, function(err, data) {
      if (err){                                      
        res.send(500)
        console.log(err)
      } else if(!data){                                 
        console.log('用户名不存在')
        res.send(200, { error: '用户名不存在'})
      } else { 
          if (req.body.password != data.password){    
            console.log('密码错误')
            res.send(200, { error: '密码错误'})
          } else {   
            console.log(data)    
            res.header('Content-Type', 'application/json;charset=utf-8')
            res.send(200, 
                {
                  uid: data._id,
                  username: data.username,
                  nickname: data.nickname,
                  avatar: data.avatar,
                  auth: data.auth
                }
            )
          }
        }
    })
  },

  view: function(req, res, next) {
    Users.find({_id: ObjectID(req.query.uid)}, function(err, data) {
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
      res.end(JSON.stringify(data));
    })
  },

  update: function(req, res, next) {
    Users.update(
      {_id: ObjectID(req.body.uid)}, 
      {$set: { 
        nickname : req.body.nickname,
        avatar: req.body.avatar 
      }}, function(err, result) {
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify({nickname: req.body.nickname, avatar: req.body.avatar}));
      }
    )
  }
}
