const path = require('path')
const fs = require('fs')
  exports.getProducts = (req, res, next) => {
    
  };
  
  exports.getProduct = (req, res, next) => {
   
      
  };
  
  exports.getIndex = (req, res, next) => {
    res.render('Layout.master')
  };
  
  exports.getCart = (req, res, next) => {
  
  };
  
  exports.postCart = (req, res, next) => {
   
  };
  
  exports.postCartDeleteProduct = (req, res, next) => {
    
  };
  
  exports.getOrders = (req, res, next) => {
    res.render('order')
  };
  
  exports.getCheckout = (req, res, next) => {
  };

  exports.getInvoiceOrders = (req,res,next) => {
    const invoiceId = req.params.orderId
    const invoicePath = path.join('data','invoices','dummy.pdf')
    fs.readFile(invoicePath,(err,data)=>{
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');     
      res.send(data)
    })
  }