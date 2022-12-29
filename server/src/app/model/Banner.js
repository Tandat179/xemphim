const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please Enter product Name'],
   },

   content: {
      type: String,
      required: [true, 'Please Enter product Description'],
   },
   time: {
      type: String,
      required: [true, 'Please Enter product Time'],
   },
   quality: {
      type: String,
      required: [true, 'Please Enter product Quality'],
   },
   lang: {
      type: String,
      required: [true, 'Please Enter product Language'],
   },
   year: {
      type: Number,
   },
   country: {
      type: String,
   },
   actor: {
      type: String,
   },
   director: {
      type: String,
   },

   ispremium: {
      type: Boolean,
      required: [true, 'Film Premium?'],
   },
   // price: {
   //    type: Number,
   //    required: [true, 'Please Enter product price'],
   //    maxLength: [8, 'Price can not exceed 8 characters'],
   // },
   // ratings: {
   //    type: Number,
   //    default: 0,
   // },
   images: [
      {
         public_id: {
            type: String,
            required: true,
         },
         url: {
            type: String,
            required: true,
         },
      },
   ],
   link_embed: {
      type: String,
      required: [true, 'Please Enter Url Film'],
   },

   poster_url: {
      type: String,
      required: [true, 'Please Enter Poster Film'],
   },

   category: {
      type: String,
      required: [true, 'Please Enter Product Category'],
   },
   // stock: {
   //    type: Number,
   //    default: 1,
   //    maxLength: [4, 'Stock can not exceed 4 characters'],
   // },
   numOfReviews: {
      type: Number,
      default: 0,
   },
   reviews: [
      {
         user: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
            required: true,
         },
         name: {
            type: String,
            required: true,
         },
         rating: {
            type: Number,
            required: true,
         },
         comment: {
            type: String,
            required: true,
         },
      },
   ],
   user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('banners', bannerSchema);
