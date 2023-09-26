
const getDb = require('../util/database').getDb
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
}

module.exports = Product;