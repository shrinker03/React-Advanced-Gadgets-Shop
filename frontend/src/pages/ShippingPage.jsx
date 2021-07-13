import React, {useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const RegisterPage = ({history}) => {
    const cart = useSelector(state => state.cart)

    const {shippingAddress} = cart
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Address Info</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address" className="my-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="city" className="my-3 ">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="city" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode" className="my-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="postalCode" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="country" className="my-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterPage