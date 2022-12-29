const Banner = require('../model/Banner');
const ErrorHander = require('../../utils/errorhander');
const ApiFeatures = require('../../utils/apiFeatures');
const cloundinary = require('cloudinary');

class BannerController {
   // Create Producer
   createBanner = async (req, res, next) => {
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
               folder: 'banners',
            });
            // Image by Link
            imagesLinks.push({
               public_id: result.public_id,
               url: result.secure_url,
            });
         }

         req.body.images = imagesLinks;
         req.body.user = req.user._id;

         const banner = await Banner.create(req.body);

         res.json({ success: true, banner });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   // Get All banner
   getAllBanner = async (req, res, next) => {
      try {
         const resultPerPage = 16;
         const bannerCount = await Banner.countDocuments();
         const apiFeaturesFilter = new ApiFeatures(Banner.find(), req.query)
            .searchByName()
            .filter();

         let banners = await apiFeaturesFilter.query;
         let filterCountBanners = banners.length;

         const apiFeaturesFilterPaginagtion = new ApiFeatures(
            Banner.find(),
            req.query,
         )

            // Pagination
            .searchByName()
            .filter()
            .pagination(resultPerPage);

         banners = await apiFeaturesFilterPaginagtion.query;

         res.json({
            success: true,
            banners,
            bannerCount,
            filterCountBanners,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get All banner of Admin
   getAllBannersAdmin = async (req, res, next) => {
      const banners = await Banner.find();

      res.status(200).json({
         success: true,
         // Response banner
         banners,
      });
   };

   // Update banner
   updateBanner = async (req, res, next) => {
      let images = [];

      try {
         // banner Search
         let banner = await Banner.findById(req.params.id);

         if (!banner) {
            return next(new ErrorHander('Banner not found', 404));
         }

         // Update Image
         if (req.body.isUpdateImages) {
            if (typeof req.body.images === 'String') {
               images.push(req.body, images);
            } else {
               images = req.body.images;
            }
            // Image With Folder
            for (let i = 0; i < banner.images.length; i++) {
               await cloundinary.v2.uploader.destroy(
                  banner.images[i].public_id,
               );
            }

            // Image With Link
            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
               const result = await cloundinary.v2.uploader.upload(images[i], {
                  folder: 'banners',
               });

               imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
               });

               req.body.images = imagesLinks;
            }
            banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
            });
         } else {
            banner = await Banner.findByIdAndUpdate(
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

         res.json({ success: true, banner });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Delete banner
   deleteBanner = async (req, res, next) => {
      try {
         let banner = await banner.findById(req.params.id);

         if (!banner) {
            return next(new ErrorHander('Banner not found', 404));
         }
         // Destroy and Remove
         for (let i = 0; i < banner.images.length; i++) {
            await cloundinary.v2.uploader.destroy(banner.images[i].public_id);
         }

         await banner.remove();
         res.json({ success: true, message: '    success', banner });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Detail banner
   detailsBanner = async (req, res, next) => {
      try {
         // Find Id
         let banner = await Banner.findById(req.params.id);
         if (!banner) {
            return next(new ErrorHander('banner not found', 404));
         }
         // Response banner by Server
         res.json({ success: true, banner });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Create Banner Review
   createBannerReview = async (req, res, next) => {
      const { rating, comment, bannerId } = req.body;
      // If user wanna Review, User need login to have user_id
      const review = {
         user: req.user._id,
         name: req.user.name,
         rating: +rating,
         comment,
      };
      try {
         // Find id banner
         const banner = await Banner.findById(bannerId);

         const isReviewed = banner.reviews.find(
            rev => rev.user.toString() === req.user._id.toString(),
         );
         // IsReviewed render to monitor
         if (isReviewed) {
            banner.reviews.forEach(rev => {
               if (rev.user.toString() === req.user._id.toString()) {
                  rev.rating = rating;
                  rev.comment = comment;
               }
            });
         } else {
            banner.reviews.push(review);
            banner.numOfReviews = banner.reviews.length;
         }

         // Reating AVG
         let avg = 0;
         banner.reviews.forEach(rev => {
            avg += rev.rating;
         });

         banner.ratings = (avg / banner.reviews.length).toFixed();
         await banner.save({ validateBeforeSave: false });

         res.json({ success: true, review });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get Review Of banner
   getBannerReview = async (req, res, next) => {
      try {
         const keyword = req.params.keyword;
         const banners = await banner.find({
            name: {
               $regex: keyword,
               $options: 'i',
            },
         }).lean();

         let AllReviews = [];
         banners.map(banner => {
            banner.reviews &&
               banner.reviews.map(rv => {
                  rv.banner_name = banner.name;
                  rv.banner_id = banner._id;
                  AllReviews.push(rv);
               });
         });
         // const { bannerId } = req.body;
         // const bannerFind = await banner.findById(bannerId);

         if (!banners) {
            res.json({ success: true, reviews: [], AllReviews });
         }

         res.json({ success: true, reviews: AllReviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get Review All Review Of banners
   getAllReview = async (req, res, next) => {
      try {
         const banners = await banner.find().lean();
         let AllReviews = [];

         // Use Map
         banners.map(banner => {
            banner.reviews &&
               banner.reviews.map(rv => {
                  rv.banner_name = banner.name;
                  rv.banner_id = banner._id;
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
         const { bannerId, id } = req.body;

         // Find Id
         const banner = await banner.findById(bannerId).lean();

         if (!banner) {
            return next(new ErrorHander('Banner not Found', 400));
         }

         // Filter
         const reviews = banner.reviews.filter(
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
         await Banner.findByIdAndUpdate(
            bannerId,
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
}

module.exports = new BannerController();
