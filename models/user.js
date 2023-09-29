const { getDb } = require("../util/database");
const mongodb = require('mongodb')
class User{
  constructor(username,email,cart,id) {
    this.username = username
    this.email = email
    this.cart = cart
    this._id = id

  }
  save(){
    const db = getDb();
    let dbOp ;
    if(this._id){
      //update user
      dbOp = db.collection('users').updateOne({_id:this._id},{$set:this})
    }else{
      dbOp = db.collection('users').insertOne(this)
    }
    return dbOp
    .then(user=>{
    //  console.log(user)
    })
    .catch(error=>{
      console.log(error)
    })
  }

  static addToCart(product){
    let updatedCart = {items:[{...product,quantity:1}]}
    const db = getDb()
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{
      cart:updatedCart
    }}).then(user=>{
      // console.log(user)
      return user
    })
  }

  static getUser = () => {
    const db = getDb();
    return db.collection('users').find().toArray()
    .then(users=>{
      return users
    })
    .catch(error=>{
      console.log(error)
    })
  }
  static findById(userId){
    const db = getDb()
    return db.collection('users').find({_id:new mongodb.ObjectId(userId)}).next()
    .then(user=>{
      return user
    })
    .catch(error=>{
      console.log(error)
    })
  }

  static delById(userId){
    const db = getDb()
    return db.collection('users').deleteOne({_id:new mongodb.ObjectId(userId)})
    .then(user=>{
      return user
    })
    .catch(error=>{
      console.log(error)
    })
  }
  
}

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
