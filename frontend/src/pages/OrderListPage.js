// Importing the modules
import React, {useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'

//Importing the action to be dispatch
import { listOrder } from '../actions/orderActions'

// Importing the Components
import Loader from '../components/Loader'
import Message from '../components/Message'

const OrderListPage = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector(state => state.orderList)
    const {orders, error, loading} = orderList
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listOrder())
        }else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className="btn-sm">
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListPage
