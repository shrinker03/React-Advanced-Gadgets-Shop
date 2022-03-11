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
            totalPrice,
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

// @desc    Update order to paid
// @route   PUT /orders/:id/pay
// @access  PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }

})

// @desc    Update order to paid
// @route   PUT /orders/:id/deliver
// @access  PRIVATE
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }

})

// @desc    Get logged in user order
// @route   GET /orders/myorders
// @access  PRIVATE
const getMyorders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

// @desc    Get all orders
// @route   GET /orders/
// @access  PRIVATE/Admin
const getorders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export {addOrderItems, getOrderById, updateOrderToPaid, getMyorders, getorders, updateOrderToDelivered}