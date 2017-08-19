var mongoose = require('./db');

UserPosts = mongoose.model('userposts', { 
    uid: Object,
    post_title: String, 
    post_desc: String, 
    post_content: String,
    post_date: Date,
    // user_docs: Array
});

module.exports = UserPosts;