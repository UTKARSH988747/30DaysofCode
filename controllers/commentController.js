// import model 
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { response } = require("express");

// business Logic
exports.createComment = async (req, res) => {
    try {
        // fetch data from request body 
        const { post, user, body } = req.body;

        // create comment object
        const comment = new Comment({
            post, user, body
        })
   // isma hum create or save dono ka use kar sakta ha
   //save ka use karne se phela humko ek array bhi banana padta ha
        // save the new comment object into the db 
        const savedComment = await comment.save();  // iski help se isme useer ek comment add kar sakta ha or usi id bhi automatically set ho jayagi

        // Find the Post By Id and the new comment to its comment array 
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })  // new: truse ki help se old or new dono data show hote ha comment section ma or push ki help se new comment add hota ha
            .populate("comments") //Populates the comment array with the comments document
            .exec();// if we don't populate then in output we can only see id but if we do this then  we can see the actual comment

        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
        return res.status(500).json({
            error : "Error while creating comment",            
        })
    }
}