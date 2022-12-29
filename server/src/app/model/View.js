const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
   //Object Prototype
   CountView: 
      {
         type: Number,
      
      required: true,
      default : 1
      },
   CountLike : {
      type : Number,
      required : true,
      default : 0
   },
   product: {
      type: mongoose.Schema.ObjectId,
      ref: 'products',
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const View = mongoose.model('view', ViewSchema);
module.exports = View;