import React, {useState, useEffect} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {getUserDetails} from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProfilePage = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)

    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
            }else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [userInfo, user, history, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match!!!')
        }else {
            //Dispatch update action
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Details</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader></Loader>}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="my-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email" className="my-3 ">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" className="my-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="my-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfilePage