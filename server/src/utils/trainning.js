const User = require('../app/model/User');
const Product = require('../app/model/Product');
var jsrecommender = require('../recommendation/recommend');

const training = async () => {
   var recommender = new jsrecommender.Recommender();
   var table = new jsrecommender.Table();

   for (let user of await User.find().lean()) {
      console.log('training user ' + user._id);

      //
      for (let vehicle of await Product.find().lean()) {
         if (vehicle.reviews.length > 0) {
            for (let review of vehicle.reviews) {
               if (user._id.toString() === review.user.toString()) {
                  table.setCell(
                     vehicle._id.toString(),
                     user._id.toString(),
                     +review.rating,
                  );
                  break;
               }
            }
         }
      }
   }

   var model = recommender.fit(table);
   console.log(model);

   // predicted_table = recommender.transform(table);

   // console.log(predicted_table);
   return recommender.transform(table);
};

module.exports = training;
