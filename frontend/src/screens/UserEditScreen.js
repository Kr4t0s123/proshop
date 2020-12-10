import React , { useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import { Form , Button} from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {  getUserDetails , updateUser  } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match , history}) => {
    const userId = match.params.id 
    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [isAdmin , setIsAdmin] = useState(false) 

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails)
    const { loading , error , user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading : loadingUpdate , error : errorUpdate, success : successUpdate } = userUpdate

   
    useEffect(()=>{
        if(successUpdate){
            dispatch({ type : USER_UPDATE_RESET })
            history.push('/admin/userList')
        } else {
            if(!user.name || user._id !== userId){
                 dispatch(getUserDetails(userId))
             } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
    }
    },[dispatch,userId, user , successUpdate,history])
   
   
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(updateUser({ _id : user._id , name , email , isAdmin }))
    }
    return (
        <>
            <Link to="/admin/userList" className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message varient='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} type='name' placeholder='Enter name' onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control value={email} type='email' placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                    <Form.Check type='checkbox' checked={isAdmin}  label='Is Admin' onChange={(e)=>setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
               
                <Button type='submit' varient='primary' block>Update</Button>
            </Form>)}
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen
