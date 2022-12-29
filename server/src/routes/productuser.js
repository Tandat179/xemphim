const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const ProduserController = require('../app/controllers/ProduserController');

// Create Produser
router.post(
   '/create',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.createProduser,
);

// Update Produser
router.put(
   '/update/:id',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.updateProduser,
);

// Delete Review
router.delete(
   '/delete/review',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.deleteReview,
);

// Delete Produser
router.delete(
   '/delete/:id',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.deleteProduser,
);
router.get('/details/:id', ProduserController.detailsProduser);

//Not Role Admin
// Create Review Someone Produser
router.put(
   '/review',
   isAuthenticatedUser,
   ProduserController.createProduserReview,
);

// router.get('/reviews', ProduserController.getProduserReview);

// Get All Produser of Admin
// router.get(
//    '/admin/produsers',
//    isAuthenticatedUser,
//    // authorizeRole('admin'),
//    ProduserController.getAllProdusersAdmin,
// );

router.get(
   '/produsers',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.getAllProdusersAdmin,
);
router.get(
   '/admin/produsers',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.getAllProdusersAdmin,
);
// Get SomeOne Produser Review
router.get(
   '/admin/review/:keyword',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.getProduserReview,
);

// Get All review
router.get(
   '/admin/reviews',
   isAuthenticatedUser,
   // authorizeRole('admin'),
   ProduserController.getAllReview,
);

router.get('/', ProduserController.getAllProduser);

module.exports = router;
