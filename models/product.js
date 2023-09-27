
const getDb = require('../util/database').getDb
const  mongodb = require('mongodb')
class Product {
  constructor(title,price,description,imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }
  save(){
    let db = getDb()
    return db.collection('products').insertOne(this)
    .then(result=>{
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
