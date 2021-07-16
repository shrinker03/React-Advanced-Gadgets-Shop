import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new Order
// @route   POST /orders
// @access  PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    
    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

})

// @desc    Get order by Id
// @route   GET /orders/:id
// @access  PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }

})

export {addOrderItems, getOrderById}