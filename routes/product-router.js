const express = require('express');
const productController =  require('../controller/productController');

const router = express.Router();

//post (save) [body]
router.post('/add-product', productController.saveProducts);
//get(fetch) [headers]
router.get('/get-all-products', productController.getAllProducts);
// Get product details
router.get('/get-product-details', productController.getProductDetails);
//delete(delete) [headers]
router.delete('/delete-product', productController.deleteProduct);
//PUT(Update) [Body]
router.put('/edit-product', productController.editProduct);


module.exports = router;
