import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart


    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>Livraison</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control type='text' placeholder='Adresse' value={address} onChange={(e) => setAddress(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Ville</Form.Label>
                    <Form.Control type='text' placeholder='Ville' value={city} onChange={(e) => setCity(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control type='text' placeholder='Code postal' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Pays</Form.Label>
                    <Form.Control type='text' placeholder='Pays' value={country} onChange={(e) => setCountry(e.target.value)} required>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Suite
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen