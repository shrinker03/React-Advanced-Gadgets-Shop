// Importing the modules
import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Importing the actions to be dispatch
import {listProducts} from '../actions/productActions'

// Importing the components
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Homepage = ({match}) => {
const keyword = match.params.keyword
    
const dispatch = useDispatch()

const productList = useSelector(state => state.productList)
const {loading, error, products} = productList

useEffect(() => {
    dispatch(listProducts(keyword))
}, [dispatch, keyword])
 
    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </div>
    )
}

export default Homepage
