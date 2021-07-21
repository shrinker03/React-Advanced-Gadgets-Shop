import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    FETCH ALL PRODUCTS
// @route   GET /products
// @access  PUBLIC 
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc    FETCH SINGLE PRODUCTS
// @route   GET /products/:id
// @access  PUBLIC 
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete Product by Id
// @route   DELETE /products/:id
// @access  PUBLIC 
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({message: "Product Removed"})
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProducts, getProductById, deleteProductById}