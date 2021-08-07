import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
    return (
        <div>
            <Card className="my-2 p-3 rounded" style={{ width: '18 rem' }}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={`${product.image}`} variant="top" />
                </Link>

                <Card.Body>
                    <Link style={{textDecoration: "none"}} to={`/product/${product._id}`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as="div">
                        <Rating value={product.rating} text={`${product.numReviews} ratings`} />
                    </Card.Text>

                    <Card.Text as="h3">${product.price}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
