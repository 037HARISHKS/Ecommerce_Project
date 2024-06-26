
const productModel = require('../models/productModel');


// Get Products API - /api/v1/products
exports.getProduct = async (req, res, next) => {
    try {
        const query = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};
        
        const products = await productModel.find(query);
        
        res.json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//get single product api - /api/v1/product/:id
exports.getSingleProduct = async (req,res,next)=>{
    
    try {
        const product = await productModel.findById(req.params.id);

        res.json({
            success : true,
            product
        })

    } catch (error) {
        res.json({
            success : false,
            message :  error.message
        })
    }
    
}