const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const handleErrors = (err) => {
  let errors = {username:'', email:'', password:''};

  if(err.code===11000){
    errors.username="username already exists";
    return errors;
  }

  if(err.message === 'Invalid Email'){
    errors.email = "username is Incorrect";
    return errors;
  }

  if(err.message === 'Invalid Password'){
    errors.password = "Incorrect Password";
    return errors;
  }

  if(err.message === 'Not a valid Token'){
    return {err:err.message}
  }

  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

const maxAge = 1*24*60*60;
const createToken = (id) => {
  return jwt.sign({id},process.env.API_SECRET,{expiresIn:maxAge});
}

/**
 * Function for User Registration
 * @param {*} req 
 * @param {*} res 
 */
const signup_post = async (req, res) => {
  const {username, email, password} = req.body
  try {
    const user = await User.create({username, email, password})
    const token = createToken(user.username)
    res.cookie('jwt',token,{
      maxAge:1000*maxAge,
      httpOnly:true,
    })
    res.status(201).send({user:user.username})
  }catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({errors})
  }
}

/**
 * Function for user login
 * @param {*} req 
 * @param {*} res 
 */
const signin_post = async (req, res) => {
  const {username, password} = req.body;
   try {
    const user = await User.login(username,password)
    const token = createToken(user.username)
    res.cookie('jwt',token,{
      maxAge:1000*maxAge,
      httpOnly: true,
    }).send({"user": user.username});
    console.log(token)
   } catch (err){
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({error:errors})
   }
}

/**
 * Function for User logout
 * @param {*} req 
 * @param {*} res 
 */
const logOut = (req, res) => {
  res.cookie('jwt','',{maxAge:1}).send({"resp":"User logout"});
}

module.exports = { signup_post, signin_post, logOut };
