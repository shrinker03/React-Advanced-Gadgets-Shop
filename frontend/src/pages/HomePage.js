// Importing the modules
import React, {useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Banner from './gadgets-shop-banner.svg'
import {ReactComponent as ProductNotFound} from './Product-Not-Found.svg'

// Importing the actions to be dispatch
import {listProducts} from '../actions/productActions'

// Importing the components
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const Homepage = ({match, location}) => {
const keyword = match.params.keyword

const pageNumber = match.params.pageNumber || 1

const dispatch = useDispatch()

const productList = useSelector(state => state.productList)
const {loading, error, products, pages, page} = productList

useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
}, [dispatch, keyword, pageNumber])
 
    return (
        <div>
            <Meta />
            
            {!keyword && (
                <>
                    <Alert variant='dark'>
                        <Alert.Heading>
                            Thank you for visiting Gadgets Store ! 🙏🙏
                            This is a Portfolio Project of <Alert.Link target='_blank' href='https://shivamdamre.herokuapp.com'> Shivam Damre</Alert.Link> <span className='ball'>😊</span>
                        </Alert.Heading>
                        
                    </Alert>
                    <img src={Banner} alt="Gadgets-Shop-Banner" />
                    <h1 className="mt-5 deals-of-day">Deals of the Day</h1>
                    <Row>
                        {products?.map((product) => (
                            product.isDiscount && (
                                <Col key={product?._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            )
                        ))}
                    </Row>
                </>
            )}
            
            {!keyword ? <ProductCarousel /> : <Link to='/' className="btn btn-light">Go Back</Link>}

            {keyword
                ? (products.length > 0 && <h1 className="mt-5 latest-products">Relevant Search</h1>)
                : (<h1 className="mt-5 latest-products">New Arrival</h1>)
            }
            
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                <>
                    <Row>
                        {products?.map((product) => (
                            <Col key={product?._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
                )
            }

            {keyword && products.length === 0 && (
                <Row className='justify-content-center'>
                    <ProductNotFound style={{maxWidth: 500, maxHeight: 500}} />
                    <h1 style={{textAlign: 'center', color: 'rgb(254, 57, 57)'}}>Oop's Product Not Found!</h1>
                </Row>
            )}
        </div>
    )
}

export default Homepage
