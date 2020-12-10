import { createStore , combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productCreateReducer, productDeleteReducer, productTopRatedReducer, productListReducer , productDetailsReducer, productReviewCreateReducer} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer , orderDetailsReducer , orderPayReducer , orderListMyReducer} from './reducers/orderReducers'
import { userUpdateReducer, userDeleteReducer,  userListReducer, userLoginReducer , userRegisterReducer , userDetailsReducer , userUpdateProfileReducer} from './reducers/userReducers'
const reducer = combineReducers({ productList : productListReducer , productDetails : productDetailsReducer , cart : cartReducer , userLogin : userLoginReducer  ,
    userRegister : userRegisterReducer , userDetails : userDetailsReducer , userUpdateProfile : userUpdateProfileReducer , orderCreate : orderCreateReducer ,orderDetails : orderDetailsReducer , orderPay : orderPayReducer , orderListMy : orderListMyReducer , productReviewCreate : productReviewCreateReducer , productTopRated : productTopRatedReducer , userList : userListReducer , userDelete : userDeleteReducer ,userUpdate : userUpdateReducer , productDelete : productDeleteReducer ,productCreate : productCreateReducer})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart : { cartItems : cartItemFromStorage , shippingAddress : shippingAddressFromStorage } ,
    userLogin : { userInfo : userInfoFromStorage } 
    
}
const middleware = [thunk];
const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)) )

export default store