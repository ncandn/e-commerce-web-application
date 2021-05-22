const axios = require('axios')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`

// show products
const product_home = async(req,res)=>{
    const osfAPI = await axios.get(`${url}products/product_search?primary_category_id=${req.params.child}&secretKey=${secret_key}`)
    res.render('products/index', {products : osfAPI.data, params : req.params})
}

// show a specific product
const product_spec = async(req,res)=>{
    const osfAPI = await axios.get(`${url}products/product_search?primary_category_id=${req.params.child}&secretKey=${secret_key}`)
    res.render('products/product_search', {products: osfAPI.data, params : req.params})   
}

const product_browse = async (req,res)=>{

    const key = req.query.key.toLowerCase().split(' ')

    const all_categories = await axios.get(`${url}categories?secretKey=${secret_key}`)
    const category_arr = []
    all_categories.data.forEach(function(category,index){
        let token = category.parent_category_id
        if(token !== "root" && token !== "mens" && token !== "womens" && category.id !== "womens-clothing-feeling-red")
            category_arr.push(category.id)
    })
    const product_arr = []
    for(const category of category_arr){
        try{
            const items = await axios.get(`${url}products/product_search?primary_category_id=${category}&secretKey=${secret_key}`)
           
            items.data.forEach(function(product,index){
                for(const param of key){
                    if(product !== undefined){
                        console.log(product.name + ' ' + product.name.toLowerCase().includes(param))
                        console.log(product.page_title + ' ' + product.page_title.toLowerCase().includes(param))
                        if(product.name.toLowerCase().includes(param) || product.page_title.toLowerCase().includes(param)){
                            product_arr.push(product)
                        }
                    }
                }
            })
        }catch(err){
            console.log('stop')
        }
    
    }
    //res.send(product_arr)
    res.render('products/index', {products : product_arr, params: req.params})
}

module.exports = {product_home, product_spec, product_browse}