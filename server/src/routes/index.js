const siteProduct = require('./product');
const siteAuth = require('./auth');
const siteOrder = require('./order');
const siteFavorite = require('./favorite');
const siteBanner = require('./banner');
const siteProduser = require('./produser');
const siteView = require('./view');

const crossOrigin = require('../utils/crossOrigin');

function route(app) {
   app.use('/product', crossOrigin, siteProduct);
   app.use('/auth', crossOrigin, siteAuth);
   app.use('/favorite', crossOrigin, siteFavorite);
   app.use('/order', crossOrigin, siteOrder);
   app.use('/banner', crossOrigin, siteBanner);
   app.use('/produser', crossOrigin, siteProduser);
   app.use('/view', crossOrigin, siteView);
}
module.exports = route;
// app.get('/searchs', (req, res) => {
//     res.render('searchs')
// });

// app.post('/searchs', (req, res) => {
//     console.log(req.body);
//     res.render('searchs')
// });
