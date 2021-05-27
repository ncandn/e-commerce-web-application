const axios = require('axios')
const secret_key = process.env.SECRET_KEY
const url = `https://osf-digital-backend-academy.herokuapp.com/api/`

// home
const category_home = async (req,res)=>{
    try {
        res.locals.nav = ["categories"]
        res.render('categories/index')
    } catch {
        res.redirect('/')
    }
}

// specific category
const category_spec = async(req,res)=>{
    try{
        const osfAPI = await axios.get(`${url}categories?secretKey=${secret_key}`)
        const filter = []
        osfAPI.data.forEach(function(category,index){
            if(!req.params.parent){
                if(req.params.category == 'menswear'){
                    if(category.id.charAt(0) == 'm' && category.parent_category_id == 'mens')
                        filter.push(category)
                } else{
                    if(category.id.charAt(0) == 'w' && category.parent_category_id == 'womens')
                        filter.push(category)
                }
                res.locals.nav = ["categories", req.params.category]
            } else{
                if(req.params.parent == 'menswear'){
                    if(category.id.charAt(0) == 'm' && category.parent_category_id == req.params.category)
                        filter.push(category)
                }else{
                    if(category.id.charAt(0) == 'w' && category.parent_category_id == req.params.category && category.name != 'Feeling Red')
                        filter.push(category)
                }
                res.locals.nav = ["categories", req.params.parent, req.params.category]
            }
        })
        
        res.render(`categories/categories`, {categories : filter, params : req.params})
    }catch(err){
        res.render('error', {error : err.response.data.error})
    }
}

module.exports = {category_home, category_spec}