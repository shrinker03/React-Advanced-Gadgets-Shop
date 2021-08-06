// Importing the modules
import React, {useState, useEffect} from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'

// Importing the actions to be dispatch
import {getUserDetails, updateUserDetails} from '../actions/userActions'
import { listMyOrder } from '../actions/orderActions'

// Importing the components
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

    const userProfileUpdate = useSelector(state => state.userProfileUpdate)
    const {success} = userProfileUpdate

    const orderListMy = useSelector(state => state.orderListMy)
    const {orders, loading: loadingOrders, error: errorOrders} = orderListMy

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrder())
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
            dispatch(updateUserDetails({id: user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Details</h2>
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    ) }</td>
                                    <td>{order.isDeliverd ? (
                                        order.deliveredAt
                                    ) : (
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    ) }</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) }
            </Col>
        </Row>
    )
}

export default ProfilePage