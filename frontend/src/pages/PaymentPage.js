// Importing the modules
import React, {useState} from 'react'
import { Button, Form, Col} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'

// Importing the action to be dispatch
import { savePaymentMethod } from '../actions/cartActions'

// Importing the Components
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentPage = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart
    
    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('paypal')
    
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod({paymentMethod}))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="PayPal or Credit Card" 
                            id="PayPal" name="paymentMethod" 
                            value="PayPal" 
                            checked 
                            onChange={(e) => setPaymentMethod(e.target.value)} 
                        >
                        </Form.Check>
                    </Col>
                </Form.Group> 
                <Button className="my-3" type="submit" variant="primary">
                        Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage