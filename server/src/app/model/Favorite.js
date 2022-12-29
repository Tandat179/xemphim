const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
   //Object Prototype

   favoriteItems: [
      {
         name: {
            type: String,
            required: true,
         },
        
         product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
         },
         image: {
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
  
   deliveredAt: Date,
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('favorites', favoriteSchema);
