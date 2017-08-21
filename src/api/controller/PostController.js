var ObjectID = require('mongodb').ObjectID
var Posts = require('../model/posts')
var Users = require('../model/users')
var UserPosts = require('../model/userposts')

module.exports = { 
  feed: function(req, res, next) {
    Posts.find({}).sort({ '_id':-1 }).exec(function(err, data) {
      if (err) return console.error(err)
      res.data = data
      return next()
    })
  },

  list: function(req, res, next) {
    const tag = new RegExp(req.query.tag, 'gi')
    UserPosts.find({ '$or': [{ tags: tag }, { post_title: tag }] }).sort({ '_id':-1 }).exec(function(err, data) {
      if (err) return console.error(err)
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
      res.end(JSON.stringify(data))
    })
  },
    
  search: function(req, res, next) {
      var re = new RegExp(req.query.k, 'gi')
      Posts.find({'$or': [ {post_title:re} , {post_content:re} ]} , function(err, data) {
          if (err) return console.error(err)
          else console.log('修改文章：' + req.body.post_title);
          res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
          res.end(JSON.stringify(data));
      })
  },

  create: function (req, res, next) {
    req.body.uid = ObjectID(req.body.uid)
    new Posts(Object.assign(req.body, {post_date: new Date()})).save( function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('新增文章：' + req.body.post_title)
        }
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
        res.end(JSON.stringify(req.body))
    })
  },

  view: function(req, res, next) {
    UserPosts.find({_id: ObjectID(req.query.postid)}, function(err, data) {
      if (err) return console.error(err)
      res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
      res.end(JSON.stringify(data))
    })
  },

  update: function(req, res, next) {
    Posts.update(
      {_id: ObjectID(req.body.post_id)}, 
      {$set: { 
        post_title: req.body.post_title, 
        post_desc: req.body.post_desc,
        post_content: req.body.post_content,
        tags: req.body.tags  
      }}, function(err, result) {
        if (err) throw err
        res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'})
        res.end(JSON.stringify({post_title: req.body.post_title}))
      }
    )
  },

  delete: function(req, res, next) {
    Posts.remove(
      {_id: ObjectID(req.body.postid)}, function(err, result) {
        if (err) throw err
      }
    )
  }
}
