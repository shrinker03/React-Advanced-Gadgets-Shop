import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderContstants'

const OrderDetailsPage = ({match, history}) => {
    const orderId = match.params.id

    const [sdkReady, SetSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const {success: successPay, loading: loadingPay} = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const {success: successDeliver, loading: loadingDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async() => {
            const {data: clientId} = await axios.get('/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                SetSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if (!window.paypal) {
                addPayPalScript()
            } else {
                SetSdkReady(true)
            }
        }
        
    }, [orderId, dispatch, order, successPay, successDeliver, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    if(!loading) {
        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }
    
    return (
        loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
        <div>  
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, 
                                {order.shippingAddress.city}, 
                                {order.shippingAddress.postalCode}, 
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <p>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your Cart is empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={4}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items
                                    </Col>
                                    <Col>
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn col-12" onClick={deliverHandler}>Mark As Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderDetailsPage
