import React, {useEffect} from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {listProducts} from '../actions/productActions'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductListPage = ({history}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {products, error, loading} = productList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        }else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('The User will be Deleted Permanentaly. Are you sure?')) {
            // Delete handler
        }
    }

    const createProductHandler = (id) => {
        // if(window.confirm('The User will be Deleted Permanentaly. Are you sure?')) {
        //     // Product handler
        // }
    }

    return (
        <div>
            <Row className="align-items-center">
                <Col><h1>Products</h1></Col>
                <Col className="text-end"> 
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default ProductListPage
