const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const ProduserController = require('../app/controllers/ProduserController');

//========================= USER ==============================
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

// Delete Produser file chi ời file y chang file bên phải, mà của proiducer
router.delete(
   '/delete/:id',
   isAuthenticatedUser,
   // authorizeRole('user'),
   ProduserController.deleteProduser,
);
router.get('/details/:id', ProduserController.detailsProduser);

// Delete Review
// router.delete(

router.get(
   '/produsers',
   isAuthenticatedUser,
   ProduserController.getAllProduser,
);

//========================= USER ===============================//

//========================= ADMIN ==============================//

router.get(
   '/produsersad',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProduserController.getAllProdusersad,
);

router.get('/detailsad/:id', ProduserController.detailsProduserad);

router.delete(
   '/deletead/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProduserController.deleteProduserad,
);


router.put(
   '/updatead/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   ProduserController.updateProduserad,
);



//=============================================================================

//    '/delete/review',
//    isAuthenticatedUser,
//    // authorizeRole('admin'),
//    ProduserController.deleteReview,
// );

//Not Role Admin
// Create Review Someone Produser
// router.put(
//    '/review',
//    isAuthenticatedUser,
//    ProduserController.createProduserReview,
// );

// router.get('/reviews', ProduserController.getProduserReview);

// Get All Produser of Admin
// router.get(
//    '/admin/produsers',
//    isAuthenticatedUser,
//    // authorizeRole('admin'),
//    ProduserController.getAllProdusersAdmin,
// );
// router.get(
//    '/admin/produsers',
//    isAuthenticatedUser,
//    // authorizeRole('admin'),
//    ProduserController.getAllProdusersAdmin,
// );
// Get SomeOne Produser Review
// router.get(
//    '/admin/review/:keyword',
//    isAuthenticatedUser,
//    // authorizeRole('admin'),
//    ProduserController.getProduserReview,
// );

// Get All review
// router.get(
//    '/admin/reviews',
//    isAuthenticatedUser,
//    // authorizeRole('admin'),
//    ProduserController.getAllReview,
// );

// router.get('/', ProduserController.getAllProduser);

module.exports = router;
