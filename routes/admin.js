const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

// User
router.get("/users",adminController.getUsers);

router.get("/addUsers",adminController.addUsers);
router.post("/addUsers",adminController.postAddUsers);

router.get('/edit-user/:userId', adminController.getEditUser);
router.post('/edit-user', adminController.postEditUser);

router.post('/delete-user',adminController.delUser)

module.exports = router;
