const Produser = require('../model/Produser');
const ErrorHander = require('../../utils/errorhander');
const ApiFeatures = require('../../utils/apiFeatures');
const cloundinary = require('cloudinary');

class ProduserController {
   // Create Producer
   createProduser = async (req, res, next) => {
      let images = [];

      if (typeof req.body.images === 'String') {
         images.push(req.body, images);
      } else {
         images = req.body.images;
      }
      try {
         const imagesLinks = [];

         for (let i = 0; i < images.length; i++) {
            // Image By folder
            const result = await cloundinary.v2.uploader.upload(images[i], {
               folder: 'produsers',
            });
            // Image by Link
            imagesLinks.push({
               public_id: result.public_id,
               url: result.secure_url,
            });
         }

         req.body.images = imagesLinks;
         req.body.user = req.user._id;

         const produser = await Produser.create(req.body);

         res.json({ success: true, produser });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   // Get All produser
   getAllProduser = async (req, res, next) => {
      const produsers = await Produser.find({ user: req.user._id });
      res.status(200).json({
         success: true,
         // Response produser
         produsers,
      });
   };

   // Update produser
   updateProduser = async (req, res, next) => {
      let images = [];

      try {
         // produser Search
         let produser = await Produser.findById(req.params.id);

         if (!produser) {
            return next(new ErrorHander('Produser not found', 404));
         }

         // Update Image
         if (req.body.isUpdateImages) {
            if (typeof req.body.images === 'String') {
               images.push(req.body, images);
            } else {
               images = req.body.images;
            }
            // Image With Folder
            for (let i = 0; i < produser.images.length; i++) {
               await cloundinary.v2.uploader.destroy(
                  produser.images[i].public_id,
               );
            }

            // Image With Link
            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
               const result = await cloundinary.v2.uploader.upload(images[i], {
                  folder: 'produsers',
               });

               imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
               });

               req.body.images = imagesLinks;
            }
            produser = await Produser.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                  new: true,
               },
            );
         } else {
            produser = await Produser.findByIdAndUpdate(
               req.params.id,
               {
                  name: req.body.name,
                  price: req.body.price,
                  urlfilm: req.body.urlfilm,
                  content: req.body.content,
                  category: req.body.category,
                  // stock: req.body.stock,
                  images: req.body.images,
                  ispremium: req.body.ispremium,
                  link_embed: req.body.link_embed,
                  time: req.body.time,
                  quality: req.body.quality,
                  lang: req.body.lang,
                  year: req.body.year,
                  country: req.body.country,
                  actor: req.body.actor,
                  director: req.body.director,
               },
               {
                  new: true,
               },
            );
         }

         res.json({ success: true, produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Delete produser
   deleteProduser = async (req, res, next) => {
      try {
         let produser = await Produser.findById(req.params.id);

         if (!produser) {
            return next(new ErrorHander('Produser not found', 404));
         }
         // Destroy and Remove
         for (let i = 0; i < produser.images.length; i++) {
            await cloundinary.v2.uploader.destroy(produser.images[i].public_id);
         }

         await produser.remove();
         res.json({ success: true, message: '    success', produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Detail produser
   detailsProduser = async (req, res, next) => {
      try {
         // Find Id
         let produser = await Produser.findById(req.params.id);
         if (!produser) {
            return next(new ErrorHander('produser not found', 404));
         }
         // Response produser by Server
         res.json({ success: true, produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Create Produser Review
   createProduserReview = async (req, res, next) => {
      const { rating, comment, produserId } = req.body;
      // If user wanna Review, User need login to have user_id
      const review = {
         user: req.user._id,
         name: req.user.name,
         rating: +rating,
         comment,
      };
      try {
         // Find id produser
         const produser = await Produser.findById(produserId);

         const isReviewed = produser.reviews.find(
            rev => rev.user.toString() === req.user._id.toString(),
         );
         // IsReviewed render to monitor
         if (isReviewed) {
            produser.reviews.forEach(rev => {
               if (rev.user.toString() === req.user._id.toString()) {
                  rev.rating = rating;
                  rev.comment = comment;
               }
            });
         } else {
            produser.reviews.push(review);
            produser.numOfReviews = produser.reviews.length;
         }

         // Reating AVG
         let avg = 0;
         produser.reviews.forEach(rev => {
            avg += rev.rating;
         });

         produser.ratings = (avg / produser.reviews.length).toFixed();
         await produser.save({ validateBeforeSave: false });

         res.json({ success: true, review });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get Review Of produser
   getProduserReview = async (req, res, next) => {
      try {
         const keyword = req.params.keyword;
         const produsers = await produser
            .find({
               name: {
                  $regex: keyword,
                  $options: 'i',
               },
            })
            .lean();

         let AllReviews = [];
         produsers.map(produser => {
            produser.reviews &&
               produser.reviews.map(rv => {
                  rv.produser_name = produser.name;
                  rv.produser_id = produser._id;
                  AllReviews.push(rv);
               });
         });
         // const { produserId } = req.body;
         // const produserFind = await produser.findById(produserId);

         if (!produsers) {
            res.json({ success: true, reviews: [], AllReviews });
         }

         res.json({ success: true, reviews: AllReviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get Review All Review Of produsers
   getAllReview = async (req, res, next) => {
      try {
         const produsers = await Produser.find().lean();
         let AllReviews = [];

         // Use Map
         produsers.map(produser => {
            produser.reviews &&
               produser.reviews.map(rv => {
                  rv.produser_name = produser.name;
                  rv.produser_id = produser._id;
                  AllReviews.push(rv);
               });
         });

         res.json({ success: true, reviews: AllReviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Delete Review
   deleteReview = async (req, res, next) => {
      try {
         const { produserId, id } = req.body;

         // Find Id
         const produser = await produser.findById(produserId).lean();

         if (!produser) {
            return next(new ErrorHander('Produser not Found', 400));
         }

         // Filter
         const reviews = produser.reviews.filter(
            rev => rev._id.toString() !== id,
         );

         let avg = 0;

         // Foreach Star Rating
         reviews.forEach(rev => {
            avg += rev.rating;
         });

         const numOfReviews = reviews.length || 0;
         let ratings = 0;
         // Rating
         if (numOfReviews) {
            ratings = (avg / reviews.length).toFixed();
         }

         // Update Number Review
         await Produser.findByIdAndUpdate(
            produserId,
            {
               reviews,
               ratings,
               numOfReviews,
            },
            { new: true },
         );

         res.json({
            success: true,
            message: 'Delete complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   updateProduserad = async (req, res, next) => {
      let images = [];

      try {
         // produser Search
         let produser = await Produser.findById(req.params.id);

         if (!produser) {
            return next(new ErrorHander('Produser not found', 404));
         }

         // Update Image
         if (req.body.isUpdateImages) {
            if (typeof req.body.images === 'String') {
               images.push(req.body, images);
            } else {
               images = req.body.images;
            }
            // Image With Folder
            for (let i = 0; i < produser.images.length; i++) {
               await cloundinary.v2.uploader.destroy(
                  produser.images[i].public_id,
               );
            }

            // Image With Link
            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
               const result = await cloundinary.v2.uploader.upload(images[i], {
                  folder: 'produsers',
               });

               imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
               });

               req.body.images = imagesLinks;
            }
            produser = await Produser.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                  new: true,
               },
            );
         } else {
            produser = await Produser.findByIdAndUpdate(
               req.params.id,
               {
                  name: req.body.name,
                  price: req.body.price,
                  urlfilm: req.body.urlfilm,
                  content: req.body.content,
                  category: req.body.category,
                  approve: req.body.approve,

                  // stock: req.body.stock,
                  images: req.body.images,
                  ispremium: req.body.ispremium,
                  link_embed: req.body.link_embed,
                  time: req.body.time,
                  quality: req.body.quality,
                  lang: req.body.lang,
                  year: req.body.year,
                  country: req.body.country,
                  actor: req.body.actor,
                  director: req.body.director,
               },
               {
                  new: true,
               },
            );
         }

         res.json({ success: true, produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   //=============================ADMIN===============================

   getAllProdusersad = async (req, res, next) => {
      const produsers = await Produser.find();
      res.status(200).json({
         success: true,
         // Response produser
         produsers,
      });
   };

   // Update produser
   updateProduserad = async (req, res, next) => {
      let images = [];

      try {
         // produser Search
         let produser = await Produser.findById(req.params.id);

         if (!produser) {
            return next(new ErrorHander('Produser not found', 404));
         }

         // Update Image
         if (req.body.isUpdateImages) {
            if (typeof req.body.images === 'String') {
               images.push(req.body, images);
            } else {
               images = req.body.images;
            }
            // Image With Folder
            for (let i = 0; i < produser.images.length; i++) {
               await cloundinary.v2.uploader.destroy(
                  produser.images[i].public_id,
               );
            }

            // Image With Link
            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
               const result = await cloundinary.v2.uploader.upload(images[i], {
                  folder: 'produsers',
               });

               imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
               });

               req.body.images = imagesLinks;
            }
            produser = await Produser.findByIdAndUpdate(
               req.params.id,
               req.body,
               {
                  new: true,
               },
            );
         } else {
            produser = await Produser.findByIdAndUpdate(
               req.params.id,
               {
                  name: req.body.name,
                  price: req.body.price,
                  urlfilm: req.body.urlfilm,
                  content: req.body.content,
                  category: req.body.category,
                  // stock: req.body.stock,
                  images: req.body.images,
                  ispremium: req.body.ispremium,
                  link_embed: req.body.link_embed,
                  time: req.body.time,
                  quality: req.body.quality,
                  lang: req.body.lang,
                  year: req.body.year,
                  country: req.body.country,
                  actor: req.body.actor,
                  director: req.body.director,
               },
               {
                  new: true,
               },
            );
         }

         res.json({ success: true, produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   detailsProduserad = async (req, res, next) => {
      try {
         // Find Id
         let produser = await Produser.findById(req.params.id);
         if (!produser) {
            return next(new ErrorHander('produser not found', 404));
         }
         // Response produser by Server
         res.json({ success: true, produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Delete produser
   deleteProduserad = async (req, res, next) => {
      try {
         let produser = await Produser.findById(req.params.id);

         if (!produser) {
            return next(new ErrorHander('Produser not found', 404));
         }
         // Destroy and Remove
         for (let i = 0; i < produser.images.length; i++) {
            await cloundinary.v2.uploader.destroy(produser.images[i].public_id);
         }

         await produser.remove();
         res.json({ success: true, message: '    success', produser });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
}

module.exports = new ProduserController();
