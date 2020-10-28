import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions';


const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }


    const [paymentMethod, setpaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Mode de paiement</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Selectionnez votre mode de paiement
                   </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal ou CB'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setpaymentMethod(e.targer.value)}>
                        </Form.Check>
                        {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setpaymentMethod(e.targer.value)}>
                        </Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Suite
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
