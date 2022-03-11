// Importing the modules
import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Form, Button, Card} from 'react-bootstrap'
import {ReactComponent as Cart} from './Cart.svg'

// Importing the actions to be dispatch
import { addToCart, removeFromCart } from '../actions/cartActions'

// Importing the components 
import Message from '../components/Message'

const CartPage = ({match, location, history}) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    return (
        <Row>
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 && (
                <Col md={8} lg={12}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                <Col md={8}>
                                    <h2>Total Items: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                                    <h4>Total: ${addDecimal(cartItems.reduce((acc, item) => acc + item.qty * (item.isDiscounted ? (item.discountPrice) : (item.price)), 0))}</h4>
                                </Col>
                                <Col md={4}>
                                    <Button 
                                        type="button"
                                        style={{marginTop: 20, marginBottom: 10, padding: 20}}
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                        className='col-12'
                                    >
                                        Proceed To Checkout
                                    </Button>
                                </Col>
                                </Row>                           
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Button 
                                    type="button"
                                    className="col-6"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed To Checkout
                                </Button>
                            </ListGroup.Item> */}
                        </ListGroup>
                    </Card>
                </Col>
            )}  
            <Col md={12} style={{marginTop: 20}}>
                {cartItems.length === 0 ? 
                (<>
                    <Row className='justify-content-center'>
                        <Message><h5>Your cart is empty  <Link to='/'> Go Back</Link></h5></Message>
                        <Cart style={{maxWidth: '450px', maxHeight: '450px'}} />
                    </Row>
                    
                </>)
                 : ( 
                    <ListGroup variant="flush">
                        <Row>
                            {cartItems.map(item => (
                                <Col md={12} lg={6}>
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col xs={12} md={2} className="my-2">
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>  
                                            <Col xs={12} md={3} className="my-2">
                                                <Link className='cart-product-name' to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>   
                                            <Col xs={4} md={2} className="my-2">${item.isDiscounted ? (item.discountPrice) : (item.price)}</Col>
                                            <Col xs={4} md={2} className="my-2">
                                                <Form.Control as="select" custom value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col> 
                                            <Col xs={4} md={2} className="my-2">
                                                <Button type="button" variant="danger" onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </Col>
                            ))}
                        </Row> 
                    </ListGroup>
                )}
            </Col>
        </Row>
    )
}

export default CartPage
