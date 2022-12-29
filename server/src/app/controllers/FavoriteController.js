const Favorite = require('../model/Favorite');
const Product = require('../model/Product');
const ErrorHander = require('../../utils/errorhander');
const User = require('../model/User');

class FavoriteController {
   myFavorites = async (req, res, next) => {
      try {
         const favorites = await Favorite.find({ user: req.user._id });
         res.json({
            success: true,
            favorites,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
   fetchCountSubscribe = async (req, res, next) => {
      try {
         const countSubscribe = await Favorite.countDocuments({ 'favoriteItems' : {$elemMatch : {product : req.params.id}} });
         res.json({
            success: true,
            countSubscribe,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
   subscribe = async (req, res, next) => {
      console.log(req.user._id,"req.user._id");
      try {
         const newFavorite = req.body
         const {status} = req.query
         const product = await Favorite.findOne({user : req.user._id})
         if(product){
            if(status === 'subscribe'){
               const news = await Favorite.findOneAndUpdate({ user: req.user._id },{$push : {favoriteItems : newFavorite}})
               res.json({
                  success: true,
                  news,
               });
            }
             else{
               const news = await Favorite.findOneAndUpdate({ user: req.user._id },{$pull : {favoriteItems : newFavorite}})
               res.json({
                  success: false,
                  news,
               });
             }
         }
         else{
            const newProduct = await Favorite.create({user : req.user._id , favoriteItems : [newFavorite]})
            res.json({
               success: false,
               newProduct,
            });
         }
         
       
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
}

module.exports = new FavoriteController();

// Create Order
// newFavorite = async (req, res, next) => {
//    try {
//       const { favoriteItems } = req.body;

//       const favorite = await Favorite.create({
//          favoriteItems,
//          user: req.user._id,
//          paidAt: Date.now(),
//       });

//       res.json({ success: true, favorite });
//    } catch (e) {
//       return next(new ErrorHander(e, 400));
//    }
// };
// Get Once Order of User
// getSingleFavorite = async (req, res, next) => {
//    try {
//       const favorite = await Favorite.findById(req.params.id).populate(
//          'user',
//          'name email',
//       );

//       if (!favorite) {
//          return next(new ErrorHander('Favorite not Found', 400));
//       }

//       res.json({
//          success: true,
//          favorite,
//       });
//    } catch (e) {
//       return next(new ErrorHander(e, 400));
//    }
// };

// Get All Order
// getAllFavorite = async (req, res, next) => {
//    let favorites;
//    let AllFavorites = [];

//    try {
//       favorites = await Favorite.find({}).populate('user', 'name');
//       if (req.query.username) {
//          const users = await User.find({
//             name: {
//                $regex: req.query.username,
//                $options: 'i',
//             },
//          }).lean();

//          favorites.forEach(favorite => {
//             users.forEach(user => {
//                if (favorite.user._id.toString() === user._id.toString()) {
//                   AllFavorites.push(favorite);
//                }
//             });
//          });
//       } else {
//          AllFavorites = await Favorite.find({}).populate('user', 'name');
//       }

//       let totalAmount = 0;

//       // Total Price of All Order
//       AllFavorites.forEach(favorite => {
//          totalAmount += favorite.totalPrice;
//       });

//       res.json({
//          success: true,
//          favorites: AllFavorites,
//          totalAmount,
//       });
//    } catch (e) {
//       return next(new ErrorHander(e, 400));
//    }
// };

// Update statusOrder
// updateStatusFavorite = async (req, res, next) => {
//    try {
//       const favorite = await Favorite.findById(req.params.id);

//       if (!favorite) {
//          return next(new ErrorHander('Favorite not Found', 400));
//       }

//       if (favorite.favoriteStatus === 'Delivered') {
//          return next(
//             new ErrorHander('Your Favorite is Delivered already', 400),
//          );
//       }

//       favorite.favoriteStatus = req.body.status;

//       // If deliveredAr -*Quantity of Stock
//       if (favorite.favoriteStatus === 'Delivered') {
//          favorite.deliveredAt = Date.now();

//          favorite.favoriteItems.forEach(async ord => {
//             let product = await Product.findById(ord.product);
//             product.stock -= ord.quantity;
//             await product.save({ validateBeforeSave: false });
//          });
//       }

//       await favorite.save({ validateBeforeSave: false });

//       res.json({
//          success: true,
//       });
//    } catch (e) {
//       return next(new ErrorHander(e, 400));
//    }
// };

// Delete Order
// deleteFavorites = async (req, res, next) => {
//    try {
//       const favorite = await Favorite.findById(req.params.id);
//       if (!favorite) {
//          return next(new ErrorHander('Favorite not Found', 400));
//       }
//       await favorite.remove();
//       res.json({
//          success: true,
//          message: 'Delete complete',
//       });
//    } catch (e) {
//       return next(new ErrorHander(e, 400));
//    }
// };
