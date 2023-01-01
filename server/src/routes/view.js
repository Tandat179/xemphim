const express = require('express');
const View = require('../app/model/View');
const router = express.Router();

//add view
router.post('/add',async(req,res)=>{
    const {CountView,product} = req.body;
    const view  = new View({CountView,product});
    if(view){
        const newView = await view.save();
        res.status(201).json(newView);
    }else{
        res.status(400).json("Invalid view data")
    }
}

)
router.post('/addField',async(req,res)=>{
    
   const news =await View.updateMany({},{"$set": {"CountLike": "1"}})
   res.status(202).json(news)
}
)
// Increase View
router.post('/increaseView/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await View.findOne({product : id})
    if(product){
        const Views = await View.findOneAndUpdate({product :id},{CountView: product.CountView+1});
       res.status(200).json(Views);

    }
    else{
        const product  = new View({CountView : 1,product : id});
      const newView =  await product.save();
        res.status(201).json(newView);
    }

}
)
router.post('/increaseLike/:id',async(req,res)=>{
    const {id} = req.params;
    const {status} = req.query;
    const product = await View.findOne({product : id})
    if(product){
        if(status === 'giam'){
            if(product.CountLike !== 0)
            {
                const Views = await View.findOneAndUpdate({product :id},{CountLike: product.CountLike-1});
                res.status(200).json(Views);
            }
            else {
                res.status(400).json("0 like roi");
            }
        }
        else{

            const Views = await View.findOneAndUpdate({product :id},{CountLike: product.CountLike+1});
            res.status(200).json(Views);
        }

    }
    else{
       
        res.status(400).json("Not Find out product");
    }

}
)
router.get('/fetchLike/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await View.findOne({product : id})
    console.log("product",product);
    if(product){
       
       res.status(200).json(product);

    }
    else{
       
        res.status(400).json("Not Find out product");
    }

}
)
router.get('/filterCustome',async(req,res)=>{
//    const limit = 20;
    const products = await View.find({}).sort({CountView : -1}).populate('product').limit(20) // sắp xếp view giảm dần

    res.status(200).json({products})
}
)
router.get('/getTopProduct' , async (req,res) => {
    const {field} = req.query
    const products = await View.find({}).sort({[field] : -1}).populate('product').limit(5)
    res.status(200).json(products)
})

module.exports = router;