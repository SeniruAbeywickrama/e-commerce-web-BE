const express = require('express');
const productController =  require('../controller/productController');

const router = express.Router();

// Add products to the db
router.post('/add-product', productController.saveProducts);
// Get details of all the projects
router.get('/get-all-products', productController.getAllProducts);
// Get details on one product using product id
router.get('/get-product-details', productController.getProductDetails);
// Delete product using id
router.delete('/delete-product', productController.deleteProduct);
// Update product details
router.put('/edit-product', productController.editProduct);
// Mark as a favourite
router.put('/mark-as-favourite', productController.markAsFavourite)


module.exports = router;
