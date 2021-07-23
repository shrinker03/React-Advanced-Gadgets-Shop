//Importing the Libraries
import React, {useEffect} from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'

// Importing Product Actions  
import {createProduct, deleteProduct, listProducts} from '../actions/productActions'

//Importing Components
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

//Creating a Product list page function
const ProductListPage = ({history}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {products, error, loading} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {success: successDelete, error: errorDelete, loading: loadingDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {success: successCreate, error: errorCreate, loading: loadingCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({type: PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin) {
            history.push('/login')
        }

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm('The Product will be Deleted Permanentaly. Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
       dispatch(createProduct())
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
            {loadingDelete && <Loader />}
            {loadingCreate && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
                                <td>${product.price}</td>
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
