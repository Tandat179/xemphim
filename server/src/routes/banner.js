const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const BannerController = require('../app/controllers/BannerController');

// Create Banner
router.post(
   '/create',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.createBanner,
);

// Update Banner
router.put(
   '/update/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.updateBanner,
);

// Delete Review
router.delete(
   '/delete/review',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.deleteReview,
);

// Delete Banner
router.delete(
   '/delete/:id',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.deleteBanner,
);
router.get('/details/:id', BannerController.detailsBanner);

//Not Role Admin
// Create Review Someone Banner
router.put(
   '/review',
   isAuthenticatedUser,
   BannerController.createBannerReview,
);

// router.get('/reviews', BannerController.getBannerReview);

// Get All Banner of Admin
router.get(
   '/admin/banners',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.getAllBannersAdmin,
);

// Get SomeOne Banner Review
router.get(
   '/admin/review/:keyword',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.getBannerReview,
);

// Get All review
router.get(
   '/admin/reviews',
   isAuthenticatedUser,
   authorizeRole('admin'),
   BannerController.getAllReview,
);

router.get('/', BannerController.getAllBanner);

module.exports = router;
