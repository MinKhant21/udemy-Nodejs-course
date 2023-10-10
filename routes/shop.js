import express from "express";
import shopController from '../controller/ShopController'
import AuthController from '../controller/AuthController'
import isAuth from "../middleware/isAuth";
const router  = express.Router();

router.post('/api/login',AuthController.login) 
router.get('/api/feed',isAuth,AuthController.feed) 

router.get('/', shopController.getIndex);
// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);
router.get('/orders/:orderId', shopController.getInvoiceOrders);

// router.get('/checkout', shopController.getCheckout);


module.exports = router