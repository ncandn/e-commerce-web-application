const axios = require('axios')

// home
const category_home = async (req,res)=>{
    try {
        res.render('categories/index')
    } catch {
        res.redirect('/')
    }
}

// specific category
const category_spec = async(req,res)=>{
    try {
        const osfAPI = await axios.get(`https://osf-digital-backend-academy.herokuapp.com/api/categories?secretKey=$2a$08$3t1EKtnyypsPeVZIrS7B9uWGSb/lRdd2z5H6nN/BPh4GuDPXeC5Du`)
        res.render(`categories/categories`, {categories : osfAPI.data, params : req.params})
    } catch {
        res.redirect('/')
    }
}


module.exports = {category_home, category_spec}