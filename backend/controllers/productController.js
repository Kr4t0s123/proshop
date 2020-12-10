import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@dec Fetch all Products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req ,res)=>{
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name : { $regex : req.query.keyword, $options : 'i' }
    } : {}
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).skip(pageSize * (page - 1)).limit(pageSize);
    res.json({products , pages : Math.ceil( count / pageSize) , page })
})

//@dec Fetch single Product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req ,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
    
})

//@dec Delete a Product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req ,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({ message : 'Product Removed'})
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
    
})


//@dec Create a Product
//@route POST /api/products/
//@access Private/Admin
const createProduct = asyncHandler(async (req ,res)=>{
    const product = new Product({
        name : 'Sample name' ,
        price : 0,
        user : req.user._id,
        image : '/images/mouse.jpg',
        brand : 'Sample branch',
        category : 'Sample Category',
        countInStock : 0,
        numReviews : 0,
        description : 'Sample description'
    })
    
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})


//@dec Update a Product
//@route PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req ,res)=>{
    const { name ,price,description,image,category,countInStock,brand} = req.body
    
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name,
        product.price = napriceme,
        product.description = description,
        product.image = image,
        product.category = category,
        product.countInStock = countInStock,
        product.brand = brand

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
            throw new Error('Product not found');
    }
    
    
    
})



//@dec Create new Review
//@route POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async (req ,res)=>{
   const { rating , comment } = req.body
   const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find( r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already Reviewed')
        }
        const review = { name : req.user.name , rating : Number(rating) , comment, user : req.user }

        product.reviews.push(review)
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc , r)=> r.rating + acc,0)/product.numReviews
        await product.save()
        res.status(201).json({ message : "Review added"})
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
    
})

//@dec Get top rated products
//@route GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req ,res)=>{
    const product = await Product.find({}).sort({ rating : -1}).limit(3)
    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found');
    }
    
})
export {createProduct,updateProduct, getProductById , getProducts , createProductReview , getTopProducts , deleteProduct} 