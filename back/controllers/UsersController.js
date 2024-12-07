

const User = require('../models/UserModel')


/**
 * Get All Users
 * @param {object} req
 * @param {object} res
 */

const getAllUsers = async (req, res) =>{
  try{
    
    const user = await User.find()

     
    if (user.length === 0) {
     
      return res.status(204).json({message:'success', data : user}) 
    }

    res.status(200).json({message:'success', data: user})

  }catch(e){
  console.error('message :' , e );
  res.status(500).json({
    success : false,
    message: 'server error'
  })
  }


}


/**
 * add User
 * @param {object} req
 * @param {object} res
*/
const addUser = async(req, res) => {
try{
  const { firstName , lastName , dateOfBirth , email, password, gender} = req.body

  if(!email || !password) {
    return res.status(400).json({ status : false , message : 'Please Provide Your email and password'})
  }


  const user = new User({firstName, lastName, dateOfBirth, email , gender, password} ) 

  await user.save();

  res.status(201).json({ status : true , message :"success" });

}catch(e){
  console.error('message :' , e );
  res.status(500).json({
    success : false,
    message: 'server error'
  })
  }

}


module.exports = {
  getAllUsers,
  addUser
}