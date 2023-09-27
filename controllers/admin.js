const Product = require('../models/product');
const mongodb = require('mongodb');
const User = require('../models/user');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title,imageUrl,price,description)
  product.save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
   
    Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const _id = new mongodb.ObjectId(prodId)
  new Product(updatedTitle,updatedPrice,updatedImageUrl,updatedDesc,_id).save()
    .then(product => {
      return product
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.delById(prodId)
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getUsers = (req,res,next) => {
  User.getUser()
  .then(users=>{
    res.render('admin/users', {
      usrs: users,
      pageTitle: 'Admin Products',
      path: '/admin/users'
    });
  })
  .catch(error=>{
    console.log(error)
  })
}

exports.addUsers = (req,res,next) =>{
  res.render('admin/addusers', {
    pageTitle: 'Add User',
    path: '/admin/addUsers',
    editing: false
  });
}

exports.postAddUsers = (req,res,next) => {
  const username = req.body.username
  const email    = req.body.email
  const users = new User(username,email)
  users.save()
  .then(result=>{
    console.log("Created Successfully user")
    return res.redirect('/admin/users')
  })
  .catch(error=>{
    console.log(error)
  })
}

exports.getEditUser = (req,res,next) => {
  const editMode = req.query.edit
  if(!editMode){
    res.redirect('/')
  }
  const userId = req.params.userId
  User.findById(userId)
  .then(user=>{
    if (!user) {
      return res.redirect('/');
    }
    res.render('admin/edit-user', {
      pageTitle: 'Edit user',
      path: '/admin/edit-user',
      editing: editMode,
      user: user
    });
  })
  .catch(error=>{
    console.log(error)
  })
}

exports.postEditUser = (req,res,next) => {
  const updateUserName = req.body.username
  const updateEmail = req.body.email
  const id = new mongodb.ObjectId(req.body.userId)
  new User(updateUserName,updateEmail,id).save()
  .then(()=>{
    console.log('edite successfully')
    res.redirect('/admin/users')
  })
  .catch(error=>{
    console.log(error)
  })
}

exports.delUser = (req,res,next) => {
  const userId = req.body.userId
  console.log(req.body)
  User.delById(userId)
  .then((result)=>{
    console.log("deleted User")
    res.redirect('/admin/users')
  })
  .catch(error=>{
    console.log(error)
  })
}

