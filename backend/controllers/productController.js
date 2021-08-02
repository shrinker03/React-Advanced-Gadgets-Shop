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
// @access  PRIVATE/Admin 
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

// @desc    Create a new Product
// @route   POST /products/
// @access  PRIVATE/Admin 
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update Product by Id
// @route   POST /products/:id
// @access  PRIVATE/Admin 
const updateProduct = asyncHandler(async (req, res) => {
    const {name, price, description, image, brand, category, countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updateProduct)
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create new review
// @route   POST /products/:id/reviews
// @access  PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        const alreadyReviwed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

        if(alreadyReviwed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0)/product.reviews.length 

        await product.save()
        res.status(201).json({message: 'Review added'})
    }else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProducts, getProductById, deleteProductById, createProduct, updateProduct, createProductReview}