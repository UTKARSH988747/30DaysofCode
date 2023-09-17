const Post = require("../models/postModel")

exports.createPost = async (req, res) => {
    try{
        const {title, body} = req.body;
        const post = new Post({title, body });
        const savedPost = await post.save();

        res.json({
            post : savedPost
        })
    }
    catch(err){
        return res.status(400).json({
            error : "Error While Creating Post"
        })
    }
}

exports.getAllPosts = async (req, res) => {
    try{
        // const posts = await Post.find();  // by this code we can only get id os like and comment
        const posts = await Post.find().populate("likes").populate("comments").exec();// with this we can get the actual comment and who 
        res.json({
            data : posts,
        })
    }
    catch(err)
    {
        return res.status(400).json({
            error : "Error while Fetching Post "
        })
    }
}