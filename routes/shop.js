const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);
router.get('/test',(req,res,next)=>{
    let limit = ""
    let search = ""
    let con = ""
    let currentDate = new Date();
    let formatCurrentDate = currentDate.toISOString().slice(0,10)

    if(req.query.pageSize && req.query.currentPage){
      let itemsPerPage = req.query.pageSize; // 10
      let page  = req.query.currentPage; // 1
      let offset  = (page - 1) * itemsPerPage;
      limit += "LIMIT " + itemsPerPage + " OFFSET " + offset;
    }
    if (req.query.type) {
      if(req.query.type == "token"){
        if (req.query.searchQuery) {
          search += "AND gt.token_no LIKE " + "%"+req.query.searchQuery+"%"
        }
      }
      if(req.query.type == "name"){
        if (req.query.searchQuery) {
          //abc
          search+="AND gt.customer_name LIKE "+ "%"+req.query.searchQuery+"%"
        }
      }
    }
    if (req.query.user_id) {
      con += `AND gcm.created_by = '${req.query.user_id}'`;
    }
    let query = `SELECT gcm.*, gt.token_no,  gt.customer_name, e.employee_name_myanmar AS check_employee_name_mm,
    e.employee_name_english AS check_employee_name_en 
    FROM goldshop_money_check gcm
    INNER JOIN goldshop_token gt ON gt.goldshop_token_id = gcm.goldshop_token_id 
    INNER JOIN hr_employee_basic_info e ON e.employee_id = gcm.check_employee_id
    WHERE gcm.status = 0 ${con}  and DATE(gcm.created_date) = '${formatCurrentDate}' ${search} ${limit}`
    console.log(query)
})
module.exports = router;
