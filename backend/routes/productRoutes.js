import express from 'express';
import colors from 'colors';
import AsyncHandler from 'express-async-handler';
const router = express.Router()
import Product from '../models/productModel.js';

// @desc      Fetch all products
// @route     GET /api/products
// @access    Private
router.get('/', AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(401)
    throw new Error('Non autorisé')
    res.json(products);
}))


// @desc      Fetch product by id
// @route     GET /api/products/:id
// @access    Public
router.get('/:id', AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Produit non trouvé');
    }
    res.json(product);
}))


export default router;
