const mongoose = require('mongoose');
const validator = require('validator');
const postSchema = new mongoose.Schema({
	postedBy:{
       type:mongoose.Schema.ObjectId,
       ref:"User"
    },
	category:{
		type:String,
		required:[ true, 'please mention category']
	},
	itemName:{
		type:String,
		required:[ true, 'please mention itemname'],
		unique:false,
	},

	amount:{
		type:Number,
		required:[ true, 'please mention amount']
	},
	expenseDate: Date,
	active:{
		type:Boolean,
		default:true,
		select: false
	}
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
