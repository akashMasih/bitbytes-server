const mongoose = require('mongoose')
const Post = require('../models/Post')

exports.create = async (req, res) => {
    const { title, content } = req.body
    if (Object.values(req.body).length === 0) {
        return res.status(400).json({ error: "plese eneter the correct values" })
    }
    if (title.length <= 2) {
        return res.status(400).json({ error: "title must contail atleast 3 characters" })
    }
    if (content.length < 10) {
        return res.status(400).json({ error: "content must contail atleast 10 characters" })
    }

    const post = new Post({
        title,
        content
    })

    const savedPost = await post.save()

    res.status(201).json({
        message: `Post created successfully!`,
        id: savedPost._id
    })

}

exports.getByID = async (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Post not found with id " + req.params.id
                });
            }
            res.json(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Post not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Error retrieving Post with id " + req.params.id
            });
        });
}

exports.getAll = async (req, res) => {
    res.json(await Post.find().sort({ created_at: -1 }))
}


exports.update = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        return res.status(400).json({
            message: "title content can not be empty"
        });
    }

    // Find post and update it with the request body
    Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled post",
        content: req.body.content
    }, { new: true })
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "post not found with id " + req.params.id
                });
            }
            res.json(post);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "post not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Error updating post with id " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "post not found with id " + req.params.id
                });
            }
            res.json({ message: "post deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    message: "post not found with id " + req.params.id
                });
            }
            return res.status(500).json({
                message: "Could not delete post with id " + req.params.id
            });
        });
};