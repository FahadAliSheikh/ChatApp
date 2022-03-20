const repos = require('../repositories');
const { createAccessToken } = require('../helpers/auth');
const bcrypt = require("bcrypt");
const AppError = require('../error/app-error');
module.exports = {
  signup,
  signin,
  getUsers,
  // logout,
  // getToken
};

async function signup(payload){
  // Manual validation, automatic validator can be used here for better usage
  console.log('inside service');
  console.log(payload);
  if(!payload.username || !payload.email || !payload.password){
    // console.log('usename, email and password are required');
    // req.status(400).json({ message: "usename, email and password are required" });
    throw new AppError('usename, email and password are required!', 400);
  }
  // check if user already exists

  const foundUserByEmail = await repos.auth.findUserByEmail(payload.email);

  if(foundUserByEmail){
    throw new AppError('This email is already in User!', 409);
  }

  const foundUserByName = await repos.auth.findUserByUserName(payload.username);
  if(foundUserByName){
    throw new AppError('This username is already in User!', 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(payload.password, salt);


  const newUser = {
    username: payload.username,
    email: payload.email,
    password: hashedPassword,
  };
 const createdUser = await  repos.auth.create(newUser);
 console.log(createdUser);
 if(createdUser){
   const returnData = {
     status: 200,
     message: "user has been created!",
     data: {createdUser}
   }
   return returnData;
 }else{
  throw new AppError('Sorry, something went wrong!', 503);
 }
}

async function signin(payload){

  if(!payload.username || !payload.password){
    throw new AppError('username and password are required!', 400)
  }

  const foundUserByEmail = await repos.auth.findUserByUserName(payload.username);

  // try to find user
  // const foundUserByEmail = await repos.auth.findUserByEmail(payload.email);
  if(!foundUserByEmail)
  throw new AppError('Sorry, user not found!', 404);

  // try to validate user
  const validPassword = await bcrypt.compare(payload.password, foundUserByEmail.password);
  console.log(validPassword);
  if(!validPassword)
  throw new AppError('Invalid email or password!', 400);

  // Generate token for valid user
  const token = await createAccessToken(foundUserByEmail);

  if(!token)
  throw new AppError('Sorry, something went wrong!', 503);
  
  const returnData = {
    status: 200,
    message: "You have successfully signedIn!",
    data: {
      token : token
    }
  }
  return returnData;
}

//get Users

  async function getUsers(payload){
  const userId = payload.userId;
  const username = payload.username;
  console.log(payload);
    const users = userId ? await repos.auth.findUserById(userId) : username ? await repos.auth.findUserByUserName(username) : await repos.auth.findAll();
    
    const returnData = {
      status: 200,
      message: "Found users",
      data: {
        users : users
      }
    }
    return returnData;

  };