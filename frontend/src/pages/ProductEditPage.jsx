// Importing the modules 
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'

// Importing the constant to be dispatch
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

// Importing the action to be dispatch
import {listProductDetails, updateProduct} from '../actions/productActions'

// Importing the components 
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductEditPage = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            }else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
        
    }, [product, dispatch, productId, history, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form'

                }
            }

            const {data} = await axios.post('/upload', formData, config)
            setImage(data)
            setUploading(false)
        }catch(error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id: productId, name, price, image, brand, category, description, countInStock}))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="my-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price" className="my-3 ">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image" className="my-3 ">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="image" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}>
                    </Form.File>
                    {uploading && <Loader />}
                    <Form.Group controlId="brand" className="my-3 ">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="brand" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category" className="my-3 ">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="category" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock" className="my-3 ">
                        <Form.Label>CountInStock</Form.Label>
                        <Form.Control type="countInStock" placeholder="Enter CountInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description" className="my-3 ">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="description" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
                )}
            </FormContainer>
        </>
        
    )
}

export default ProductEditPage