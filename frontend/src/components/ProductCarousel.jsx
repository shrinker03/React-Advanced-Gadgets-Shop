import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { listTopProducts } from '../actions/productActions'

import Message from './Message'
import Loader from './Loader'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const topRatedProducts = useSelector((state) => state.topRatedProducts)
    const {error, products, loading} = topRatedProducts

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
            loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <h1>Best Rated Products</h1>
                <Carousel pause="hover" className="bg-dark" >  
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                                <Carousel.Caption className="carousel-caption">
                                    <h2>{product.name} (${product.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel> 
                </>   
            )
    )
}

export default ProductCarousel
