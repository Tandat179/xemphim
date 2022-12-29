const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const ProductController = require('../app/controllers/ProductController');

// Create Product
router.post(
   '/create',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.createProduct,
);

// Update Product
router.put(
   '/update/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.updateProduct,
);

// Delete Review
router.delete(
   '/delete/review',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.deleteReview,
);

// Delete Product
router.delete(
   '/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.deleteProduct,
);
router.get('/details/:id', ProductController.detailsProduct);

//Not Role Admin
// Create Review Someone Product
router.put(
   '/review',
   isAuthenticatedUser,
   ProductController.createProductReview,
);

// router.get('/reviews', ProductController.getProductReview);

// Get All Product of Admin
router.get(
   '/admin/products',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.getAllProductsAdmin,
);

// Get SomeOne Product Review
router.get(
   '/admin/review/:keyword',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.getProductReview,
);

// Get All review
router.get(
   '/admin/reviews',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProductController.getAllReview,
);


router.get('/', ProductController.getAllProduct);
router.get('/filter', ProductController.filterProduct);
router.get('/getProductByCategory', ProductController.getproductByCategory);
router.get('/test', ProductController.test);
module.exports = router;
