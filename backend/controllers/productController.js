import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc      Fetch all products
// @route     GET /api/products
// @access    Private
const getProducts = AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})

// @desc      Fetch product by id
// @route     GET /api/products/:id
// @access    Public
const getProductById = AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Produit non trouvé');
    }
})

export { getProducts, getProductById }