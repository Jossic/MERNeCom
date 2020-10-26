import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                console.log(user.name);
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if (name === '' && email === '' && password === '' && confirmPassword === '') {
            setMessage('Tous les champs sont requis');
        }
        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas')
        } else {
            // dispatch(register(name, email, password));
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>Profil utilisateur</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Prénom et nom</Form.Label>
                        <Form.Control type='name' placeholder='Entrez votre prénom et votre nom' value={name} onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder='Entrez votre email' value={email} onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type='password' placeholder='Entrez votre password' value={password} onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirmer votre mot de passe</Form.Label>
                        <Form.Control type='password' placeholder='Entrez votre password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Mettre à jour mes informations</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>Mes commandes</h2>
            </Col>
        </Row>

    )
}

export default ProfileScreen
