const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
  create,
  findUserByEmail,
  findUserByUserName,
  findUserById,
  findAll
}

async function create(payload){
  console.log('inside repo');
  console.log(payload);
  // const newUser = new User(payload);
  const createdUser = await User.create(payload);
  console.log(createdUser);
  return createdUser;

}

async function findUserByEmail(email){
  console.log('inside repo');
  // const newUser = new User(payload);
  const foundUser = await User.findOne({email:email});
  return foundUser;

}

async function findUserByUserName(username){
  console.log('inside repo');
  // const newUser = new User(payload);
  const foundUser = await User.findOne({username:username});
  return foundUser;

}

async function findUserById(userId){
  console.log('inside repo');
  // const newUser = new User(payload);
  const foundUser = await User.findOne({_id:userId});
  return foundUser;

}

async function findUserById(userId){
  console.log('inside repo');
  // const newUser = new User(payload);
  const foundUser = await User.findOne({_id:userId});
  return foundUser;

}



async function findAll(){
  console.log('inside repo');
  // const newUser = new User(payload);
  const foundUser = await User.find();
  return foundUser;
}
