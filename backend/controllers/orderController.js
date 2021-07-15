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
        const order = new Order({orderItems, 
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

