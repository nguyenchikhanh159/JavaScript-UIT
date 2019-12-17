

var Post = require('../model/Post');
var request = require('request');
var request = require('request');


exports.Comment = async (req, res, next) => {
    let { data } = req.body;
    const NewPost = new Post({
        name: data.name,
        student_id: data.student_id,
        content: data.content,
        rating: data.rating,
        time: data.time,
    })
    await NewPost.save(err => {
        if (err) handleError(err)
    })
    res.json({ "status": 200 });
}
exports.ResComment = async (req, res, next) => {
    var s = Post.find().limit(20).sort({ _id: -1 })
        .exec(function (err, data) {
            if (err) return handleError(err);
            res.json(data);
        })
}
