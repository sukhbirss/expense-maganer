const Post = require('./../models/postModel');
const catchAsync = require('./../util/catchAsync');


exports.post = catchAsync(async(req,res,next) => {
  console.log('post')
	 const newPost = await Post.create({
    category: req.body.category,
    itemName: req.body.itemName,
    amount: req.body.amount,
    expenseDate: req.body.expenseDate,
    postedBy: req.user.id

  });


   console.log(newPost);
	 //const token = jwt.sign({ id: newUser.id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});

	
  res.status(200).json({
  	status:'success',
  	newPost
  })

});

exports.getPosts = catchAsync(async(req,res,next) => {
  
  let post =  await Post.find({postedBy:{$in:req.user.id},active:{$in:true}})
  

  res.status(200).json({
        status:'success',
        post
      })
  
  

});


exports.deleteMyPost = catchAsync(async(req,res,next) => {
console.log("jattsab")
const updatedPser = await Post.findByIdAndUpdate(req.body.id,{active:false} , {
    new: true
  });
    console.log(req.body.active)
    res.status(200).json({
      status: 'success',
      data: {
        post: updatedPser
      }
    });

})


// exports.getMyPosts = catchAsync(async(req,res,next) => {
  
//   const post = await Post.find({postedBy:req.user.id})
//   console.log(post)
//   res.status(200).json({
//     status:'success',
//     post
//   })

// })

// exports.likes = catchAsync(async(req,res,next) => {
//   console.log("this",req.user.id)
  
//    const post = await Post.findByIdAndUpdate(req.body.id,{
//         $push:{likes:req.user._id}
//     },{
//         new:true
//     });

//   console.log("liking the post",post)
//   res.status(200).json({
//     status:'success',
//     post
//   })
// })

// exports.unLikes = catchAsync(async(req,res,next) => {
  
//    const post = await Post.findByIdAndUpdate(req.body.id,{
//     $pull:{likes:req.user._id}
//     },
//     {new:true});
    
//   console.log("unlikng the post",post)
//     res.status(200).json({
//      status:'success',
//      post
//   })

// })