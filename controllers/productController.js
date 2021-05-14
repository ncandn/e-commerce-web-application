const axios = require('axios')

// show products
const product_home = async(req,res)=>{
    const testAPI = await axios.get(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?primary_category_id=womens-clothing-tops&secretKey=$2a$08$3t1EKtnyypsPeVZIrS7B9uWGSb/lRdd2z5H6nN/BPh4GuDPXeC5Du`)
    res.render('products/index', {products : testAPI.data})
}

// show a specific product
const product_spec = async(req,res)=>{
    try{
        const testAPI = await axios.get(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?primary_category_id=womens-clothing-tops&secretKey=$2a$08$3t1EKtnyypsPeVZIrS7B9uWGSb/lRdd2z5H6nN/BPh4GuDPXeC5Du`)
        res.send(testAPI.data)
    }catch{
        console.log('error')
    }
}

module.exports = {product_home, product_spec}