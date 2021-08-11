import React from 'react';
import { Card, Row, Col, Badge, Tag } from 'react-bootstrap';
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

                    {product.isDiscount 
                        ? 
                        <Row>
                            <Col>
                                <Card.Text as="h3" >
                                    <Badge bg="secondary" style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>${product.price}</Badge>
                                </Card.Text>
                            </Col>
                            <Col>
                                {
                                    product.isDiscount && 
                                    (
                                        <> 
                                            <Card.Text as="h3">
                                                ${product.discountPrice}
                                            </Card.Text>
                                        </>
                                    )
                                }
                            </Col>
                        </Row>
                        :
                        <Card.Text as="h3">
                            ${product.price}
                        </Card.Text>
                    }    
                    
                   
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
