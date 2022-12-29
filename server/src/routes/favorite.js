const express = require('express');
const router = express.Router();
const {
   isAuthenticatedUser,
   authorizeRole,
} = require('../app/middlewares/auth');

const FavoriteController = require('../app/controllers/FavoriteController');
// router.post('/new', isAuthenticatedUser, FavoriteController.newFavorite);
router.get('/myFavorites', isAuthenticatedUser, FavoriteController.myFavorites);
router.post('/subscribe', isAuthenticatedUser, FavoriteController.subscribe);
router.get('/fetchCountSub/:id', FavoriteController.fetchCountSubscribe);
// router.get(
//    '/me/:id',
//    isAuthenticatedUser,
//    FavoriteController.getSingleFavorite,
// );



module.exports = router;
