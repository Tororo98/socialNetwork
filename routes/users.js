const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Update user
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            } catch(err){
                return res.status(500).json(err); 
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("User updated!");
        } catch(err){
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("Invalid action");
    }
});

//Delete user
router.delete("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete({_id:req.params.id});
            res.status(200).json("User deleted!");
        } catch(err){
            return res.status(500).json(err);
        }
    } else{
        return res.status(403).json("Invalid action");
    }
});

//Get user
router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, updatedAt, isAdmin, __v, ...other} = user._doc
        res.status(200).json(other);
    } catch(err){
        return res.status(500).json(err);
    }
});

//Follow user
router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId != req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("user followed!");
            } else{
                res.status(403).json("You can't follow that person again");
            }
        } catch(err){
            return res.status(500).json(err);
        }
    } else{
        res.status(403).json("You can't follow that person");
    }
});

//Unfollow user
router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId != req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currUser.updateOne({$pull:{following:req.body.userId}});
                res.status(200).json("user unfollowed!");
            } else{
                res.status(403).json("You can't unfollow that person again");
            }
        } catch(err){
            return res.status(500).json(err);
        }
    } else{
        res.status(403).json("You can't unfollow that person");
    }
});

module.exports = router;