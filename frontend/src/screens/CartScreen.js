import React , { useEffect } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Row , Col, Image , ListGroup ,Form , Button , Card} from 'react-bootstrap'
import { addToCart ,removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match , location , history}) => {
    const productId = match.params.id
    const dispatch = useDispatch()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state=>state.cart)
    const { cartItems } = cart
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    const checkoutHandler =()=>{
        history.push('/login?redirect=shipping')
    }
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }
    return (
        <Row>
            <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>You cart is empty <Link to='/'>Go Back</Link></Message> : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} rounded fluid/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/products/${item.product}`}>
                                    {item.name}
                                    </Link>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={2}>
                                     <Form.Control as='select' value={item.qty} onChange={e=>dispatch(addToCart(item.product,e.target.value))}>
                                                    {[...Array(item.countInStock).keys()].map(x=>(
                                                        <option key={x+1} value={x+1}>
                                                                {x+1}
                                                        </option>
                                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc , item)=>{ return acc + Number(item.qty)}, 0)}) items</h2>
                            ${cartItems.reduce((acc , item)=>{ return acc + ( Number(item.qty)*Number(item.price))} ,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Chechout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
           
        </Row>
    )
}

export default CartScreen
