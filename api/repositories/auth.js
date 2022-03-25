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
  const createdUser = await User.create(payload);
  return createdUser;

}

async function findUserByEmail(email){
  const foundUser = await User.findOne({email:email});
  return foundUser;

}

async function findUserByUserName(username){
  const foundUser = await User.findOne({username:username});
  return foundUser;

}

async function findUserById(userId){
  const foundUser = await User.findOne({_id:userId});
  return foundUser;

}



async function findAll(){
  const foundUser = await User.find();
  return foundUser;
}
