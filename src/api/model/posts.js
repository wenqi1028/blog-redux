var mongoose = require('./db');
var ObjectID = require('mongodb').ObjectID

Posts = mongoose.model('posts', { 
    uid: Object,
    post_title: String, 
    post_desc: String, 
    post_content: String,
    post_date: Date,
    update_date: Date,
    tags: String
});

module.exports = Posts;