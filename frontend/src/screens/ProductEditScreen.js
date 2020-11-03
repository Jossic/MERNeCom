import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.CountInStock)
                setDescription(product.description)
            }
        }

    }, [product, dispatch, productId, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Retour</Link>
            <FormContainer>
                <h1>Modifier un produit</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type='name' placeholder='Entrez votre prénom et votre nom' value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Prix</Form.Label>
                            <Form.Control type='number' placeholder='Entrez votre prix' value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Lien de votre image' value={image} onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Marque</Form.Label>
                            <Form.Control type='text' placeholder='Lien de votre marque' value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control type='text' placeholder='Lien de votre categorie' value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Stocks</Form.Label>
                            <Form.Control type='number' placeholder='Lien de votre stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Descriptif</Form.Label>
                            <Form.Control type='text' placeholder='Lien de votre description' value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Modifier</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default ProductEditScreen
