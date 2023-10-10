
exports.getAddProduct = (req, res, next) => {
    res.render('addProduct')
};


exports.postAddProduct = (req, res, next) => {
//   console.log(JSON.stringify(req.body))
  console.log(req.file)
};

exports.postEditProduct = (req, res, next) => {
  
  
};

exports.getProducts = (req, res, next) => {

};

exports.postDeleteProduct = (req, res, next) => {
  
};