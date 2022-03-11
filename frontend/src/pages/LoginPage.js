// Importing the modules
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Col, Form, Row, Container } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {ReactComponent as SignIn} from './SignIn.svg'

// Importing the actions to be dispatch
import {login} from '../actions/userActions'

// Importing the Components
// import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginPage = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [userInfo, redirect, history])

    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    const adminGuestHandler = () => {
        const adminEmail = process.env.REACT_APP_GUEST_ADMIN_LOGIN_MAIL
        const adminPass = process.env.REACT_APP_GUEST_ADMIN_LOGIN_PASS
        dispatch(login(adminEmail, adminPass))
    }

    const guestHandler = async() => {
        const guestEmail = process.env.REACT_APP_GUEST_LOGIN_MAIL
        const guestPass = process.env.REACT_APP_GUEST_LOGIN_PASS
        dispatch(login(guestEmail, guestPass))
    }

    return (
        <Row>
            <Col md={6}><SignIn style={{maxWidth: 600, maxHeight: 600}} /></Col>
            <Col md={6}>
        
            <Container>
                <h1>Sign In</h1>

                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader></Loader>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail" className="my-4">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="my-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" size='lg'>
                        Sign In
                    </Button>
                </Form>
                
                <Row className="py-3 mt-1">
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
                <Row className="py-3">
                    <Col className='p-2' xs={12} md={6}>
                        <Button onClick={guestHandler} variant="outline-secondary" size='lg'>
                            Login as Guest
                        </Button>
                    </Col>
                    <Col className='p-2' xs={12} md={6}>
                        <Button onClick={adminGuestHandler} variant="outline-primary" size='lg'>
                            Login as Admin Guest
                        </Button>
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>
    )
}

export default LoginPage
