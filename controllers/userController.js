const User = require('./../models/userModel');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');



exports.getme = catchAsync(async(req,res,next) => {
  user = req.user
  res.status(200).json({
    status:'success',
    user
  })
});


exports.addCategory = catchAsync(async(req,res,next) => {
 	
    

  res.status(200).json({
    status:'success',
    user
  })
});


exports.updateMe = catchAsync(async (req, res, next) => {
      let updatedUser;
    if(req.body.budget){
           updatedUser = await User.findByIdAndUpdate(req.user.id,{budget:req.body.budget} , {
          new: true
        });
    }
    if(req.body.category){
      console.log("jattttt")
       updatedUser = await User.findByIdAndUpdate(req.user.id,{
          $push:{categoreis:req.body.category}
      },{
          new:true
      });
  }
    if(req.body.categoryDelete){
      console.log("jattttt")
       updatedUser = await User.findByIdAndUpdate(req.user.id,{
          $pull:{categoreis:req.body.categoryDelete}
      },{
          new:true
      });
  }

    console.log(req.body)
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  
});