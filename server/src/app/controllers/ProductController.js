const Product = require('../model/Product');
const ErrorHander = require('../../utils/errorhander');
const ApiFeatures = require('../../utils/apiFeatures');
const cloundinary = require('cloudinary');
const removeVietnameseTones = require('../../constant/RemoveVietnam');
const View = require('../model/View');

class ProductController {
   // Create Producer
   createProduct = async (req, res, next) => {
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
               folder: 'products',
            });
            // Image by Link
            imagesLinks.push({
               public_id: result.public_id,
               url: result.secure_url,
            });
         }

         req.body.images = imagesLinks;
         req.body.user = req.user._id;

         const product = await Product.create(req.body);

         res.json({ success: true, product });
      } catch (e) {
         return next(new ErrorHander(e, 401));
      }
   };

   // Get All Product
   getAllProduct = async (req, res, next) => {
      try {
         const resultPerPage = req.query.limit || 16;

         const productCount = await Product.countDocuments();
         const apiFeaturesFilter = new ApiFeatures(Product.find(), req.query)
            .searchByName()
            .filter();

         let products = await apiFeaturesFilter.query;
         let filterCountProducts = products.length;

         const apiFeaturesFilterPaginagtion = new ApiFeatures(
            Product.find(),
            req.query,
         )

            // Pagination
            .searchByName()
            .filter()
            .pagination(resultPerPage);

         products = await apiFeaturesFilterPaginagtion.query;

         res.json({
            success: true,
            products,
            productCount,
            filterCountProducts,
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get All Product of Admin
   getAllProductsAdmin = async (req, res, next) => {
      const products = await Product.find();

      res.status(200).json({
         success: true,
         // Response Product
         products,
      });
   };

   // Update Product
   updateProduct = async (req, res, next) => {
      let images = [];

      try {
         // Product Search
         let product = await Product.findById(req.params.id);

         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }

         // Update Image
         if (req.body.isUpdateImages) {
            if (typeof req.body.images === 'String') {
               images.push(req.body, images);
            } else {
               images = req.body.images;
            }
            // Image With Folder
            for (let i = 0; i < product.images.length; i++) {
               await cloundinary.v2.uploader.destroy(
                  product.images[i].public_id,
               );
            }

            // Image With Link
            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
               const result = await cloundinary.v2.uploader.upload(images[i], {
                  folder: 'products',
               });

               imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
               });

               req.body.images = imagesLinks;
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
            });
         } else {
            product = await Product.findByIdAndUpdate(
               req.params.id,
               {
                  name: req.body.name,
                  price: req.body.price,
                  urlfilm: req.body.urlfilm,
                  content: req.body.content,
                  category: req.body.category,
                  stock: req.body.stock,
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

         res.json({ success: true, product });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Delete Product
   deleteProduct = async (req, res, next) => {
      try {
         let product = await Product.findById(req.params.id);

         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }
         // Destroy and Remove
         for (let i = 0; i < product.images.length; i++) {
            await cloundinary.v2.uploader.destroy(product.images[i].public_id);
         }

         await product.remove();
         res.json({ success: true, message: '    success', product });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Detail Product
   detailsProduct = async (req, res, next) => {
      try {
         // Find Id
         let product = await Product.findById(req.params.id);
         if (!product) {
            return next(new ErrorHander('Product not found', 404));
         }
         // Response Product by Server
         res.json({ success: true, product });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Create Product Review
   createProductReview = async (req, res, next) => {
      const { rating, comment, productId } = req.body;
      // If user wanna Review, User need login to have user_id
      const review = {
         user: req.user._id,
         name: req.user.name,
         rating: +rating,
         comment,
      };
      try {
         // Find id Product
         const product = await Product.findById(productId);

         const isReviewed = product.reviews.find(
            rev => rev.user.toString() === req.user._id.toString(),
         );
         // IsReviewed render to monitor
         if (isReviewed) {
            product.reviews.forEach(rev => {
               if (rev.user.toString() === req.user._id.toString()) {
                  rev.rating = rating;
                  rev.comment = comment;
               }
            });
         } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
         }

         // Reating AVG
         let avg = 0;
         product.reviews.forEach(rev => {
            avg += rev.rating;
         });

         product.ratings = (avg / product.reviews.length).toFixed();
         await product.save({ validateBeforeSave: false });

         res.json({ success: true, review });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get Review Of Product
   getProductReview = async (req, res, next) => {
      try {
         const keyword = req.params.keyword;
         const products = await Product.find({
            name: {
               $regex: keyword,
               $options: 'i',
            },
         }).lean();

         let AllReviews = [];
         products.map(product => {
            product.reviews &&
               product.reviews.map(rv => {
                  rv.product_name = product.name;
                  rv.product_id = product._id;
                  AllReviews.push(rv);
               });
         });
         // const { productId } = req.body;
         // const productFind = await Product.findById(productId);

         if (!products) {
            res.json({ success: true, reviews: [], AllReviews });
         }

         res.json({ success: true, reviews: AllReviews });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };

   // Get Review All Review Of Products
   getAllReview = async (req, res, next) => {
      try {
         const products = await Product.find().lean();
         let AllReviews = [];

         // Use Map
         products.map(product => {
            product.reviews &&
               product.reviews.map(rv => {
                  rv.product_name = product.name;
                  rv.product_id = product._id;
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
         const { productId, id } = req.body;

         // Find Id
         const product = await Product.findById(productId).lean();

         if (!product) {
            return next(new ErrorHander('Product not Found', 400));
         }

         // Filter
         const reviews = product.reviews.filter(
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
         await Product.findByIdAndUpdate(
            productId,
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
   test = async (req, res, next) => {
      try {
         const { name } = req.query;

         const item = await Product.findOne({ name });

         const { category } = item;
         const newCategory = removeVietnameseTones(category);
         item.category = newCategory;
         console.log(newCategory);
         // let doc = await Product.findOneAndUpdate({name}, item);
         item.category = newCategory;

         let doc = await Product.findOneAndUpdate({ name }, item);

         res.json({
            success: true,
            item,
            message: 'Delete complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
   getproductByCategory = async (req, res, next) => {
      try {
         const { category } = req.query;
         const products = await Product.find({
            category: { $regex: category, $options: 'i' },
         });

         res.json({
            success: true,
            products,
            message: 'Delete complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
   filterProduct = async (req, res, next) => {
      try {
         const keyword = req.query;
         console.log(keyword, 'keyword');
         // const { category } = req.query;
         let products;
         if (req.query.category) {
            products = await Product.find({
               category: { $regex: req.query.category, $options: 'i' },
            });
         } else {
            products = await Product.find(keyword);
         }
         res.json({
            success: true,
            products,
            message: 'Delete complete',
         });
      } catch (e) {
         return next(new ErrorHander(e, 400));
      }
   };
}
module.exports = new ProductController();
