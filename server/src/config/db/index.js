const mongo = require('mongoose');

async function connect() {
   try {
      await mongo.connect(
         'mongodb+srv://durand:123123123@cluster0.llxjqcl.mongodb.net/ecomerce?retryWrites=true&w=majority',
   
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         },
      );
      ('');
      console.log('Connection Succes!!!');
   } catch (error) {
      console.log('Connection Failed!!!');
   }
}
module.exports = { connect };

// mongodb+srv://durand:<password>@cluster0.llxjqcl.mongodb.net/?retryWrites=true&w=majority
      // mongodb+srv://dat668:1234@film.axxxmmz.mongodb.net/film?retryWrites=true&w=majority
         // mongodb+srv://dat668:<password>@film.axxxmmz.mongodb.net/film?retryWrites=true&w=majority
         //mongodb+srv://durand:123123123@cluster0.llxjqcl.mongodb.net/ecomerce?retryWrites=true&w=majority