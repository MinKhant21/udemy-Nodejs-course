
const getDb = require('../util/database').getDb
const  mongodb = require('mongodb')
class Product {
  constructor(title,price,description,imageUrl,id) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id
  }
  save(){
    let db = getDb()
    let dbOp;
    if(this._id){
      // update Product
      dbOp = db.collection('products').updateOne({_id:this._id},{$set:this})
    }else{
      dbOp = db.collection('products').insertOne(this)
    }
    return dbOp.then(result=>{
      console.log(result)
    })
    .catch(error=>{
      throw error
    })
  }
  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
    .then(products=>{
      console.log(products)
      return products
    })
    .catch((error)=>{
      throw error
    })
  }
  static findById(productId){
    const db = getDb()
    return db.collection('products').find({_id:new mongodb.ObjectId(productId)}).next()
    .then((product)=>{
      // console.log(product)
      return product
    })
    .catch(err=>console.log(err))
  }
}

module.exports = Product;
