const router = require("express").Router();
const { load } = require("nodemon/lib/config");
const Post = require("../models/Post");
const User = require("../models/User");
const mongodb = require("mongodb");

//Create post
router.post("/", async (req,res)=>{
    const newPost = await new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err){
        res.status(500).json(err);
    }
});

//Update post
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("Post updated!");
        } else{
            res.status(403).json("That is not a post of yours!");
        }
    } catch(err){
        res.status(500).json(err);
    }   
});

//Delete post
router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        console.log(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post deleted!");
        } else{
            res.status(403).json("That is not a post of yours!");
        }
    } catch(err){
        res.status(500).json(err);
    }   
});

//Get post
router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
    }
});

//Like or dislike a post
router.put("/:id/like", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            res.status(200).json("You liked the post!");
        } else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("You diliked the post!");
        }
    } catch(err){
        res.status(500).json(err);
    }
});

//Get timeline posts
router.get("/timeline/all", async (req,res)=>{
    let postsArray = [];
    try{
        const currUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId:currUser._id});
        const friendPosts = await Promise.all(
            currUser.following.map(friendId=>{
                return Post.find({userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch(err){
        res.status(500).json(err);
    }
});

//Get every post
router.get("/home/all", async (req,res)=>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

module.exports = router;