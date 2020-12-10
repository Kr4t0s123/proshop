import React , { useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import { Row , Col , Form , Button} from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {  register } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

const RegisterScreen = ({ location , history}) => {
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmpassword , setConfirmPassword] = useState('')
    const [message , setMessage] = useState(null)

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister)
    const { loading , error , userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'
   
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history , userInfo , redirect])
   
   
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password !== confirmpassword){
            setMessage('Password do not match')
        } else {
            dispatch(register(name,email,password))
        }
        //Dispatch Register

    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message varient='danger'>{error}</Message>}
            {message && <Message varient='danger'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} type='name' placeholder='Enter name' onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control value={email} type='email' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} type='password' placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmpassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={confirmpassword} type='password' placeholder='Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' varient='primary' block>Register</Button>
            </Form>
            <Row className='py-3'>
                    <Col>
                        Have an Account ? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
