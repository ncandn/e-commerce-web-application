const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")

const { expect, should } = chai
chai.use(chaiHttp)
describe("Server", ()=>{
    describe("Products", ()=>{

        // get products
        it("Gets products page", (done) =>{
            chai
                .request(app)
                .get("/products")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(4000)
        
        // get product desc. page
        it("Gets a specific product", (done)=>{
            chai
                .request(app)
                .get("/categories/menswear/mens-clothing/mens-clothing-dress-shirts/69309284") // example item
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(4000)

        // browse through products
        it("Browses a specific product", (done)=>{
            chai
                .request(app)
                .get("/products/product_search?key=shirt") // example query
                .query({key: 'shirt'})
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(3000)
    })

    describe("Categories", ()=>{

        // get category main page
        it("Gets the category main page", (done)=>{
            chai
                .request(app)
                .get("/categories")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    done()
                })
        })

        // get parent category page
        it("Gets the parent category page", (done)=>{
            chai
                .request(app)
                .get("/categories/menswear")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        })

        // get child category page
        it("Gets the child category page", (done)=>{
            chai
                .request(app)
                .get("/categories/menswear/mens-clothing")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        })
    })

    describe("Auth", ()=>{

        // Signup
        it("Signup", (done) =>{
            chai
                .request(app)
                .post("/auth/signup")
                .send(
                    {
                        "secretKey": process.env.SECRET_KEY,
                        "name": "unit_tester",
                        "email": "unit_testing@osf.com",
                        "password": "unit_testing",
                        "passwordConf": "unit_testing"
                    }
                )
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        })
        
        // Signin
        it("Signin", (done)=>{
            chai
                .request(app)
                .post("/auth/signin")
                .send(
                    {
                        "secretKey": process.env.SECRET_KEY,
                        "email": "unit_testing@osf.com",
                        "password": "unit_testing"
                    }
                )
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(4000)
    })


    describe("Cart", ()=>{
        
        // get cart
        it("Gets cart", (done) =>{
            chai
                .request(app)
                .get("/cart")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)
        
        // add to cart
        it("Adds an item to the cart", (done)=>{
            chai
                .request(app)
                .post("/cart/addItem")
                .send({
                    "secretKey": process.env.SECRET_KEY,
                    "productId": "25518241",
                    "variantId": "701642838739",
                    "quantity":"2"
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)

        // change quantity in cart
        it("Changes quantity of an item in the cart", (done)=>{
            chai
                .request(app)
                .post("/cart/changeItemQuantity") 
                .send({
                    "secretKey": process.env.SECRET_KEY,
                    "productId": "25518241",
                    "variantId": "701642838739",
                    "quantity":"3"
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)

        // deletes an item from the cart
        it("Deletes an item from the cart", (done)=>{
            chai
                .request(app)
                .del("/cart/removeItem") 
                .send({
                    "secretKey": process.env.SECRET_KEY,
                    "productId": "25518241",
                    "variantId": "701642838739"
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)
    })

    describe("Wishlist", ()=>{
        
        // get cart
        it("Gets wishlist", (done) =>{
            chai
                .request(app)
                .get("/wishlist")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)
        
        // add to wishlist
        it("Adds an item to the wishlist", (done)=>{
            chai
                .request(app)
                .post("/wishlist/addItem")
                .send({
                    "secretKey": process.env.SECRET_KEY,
                    "productId": "25518241",
                    "variantId": "701642838739",
                    "quantity":"2"
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)

        // change quantity in wishlist
        it("Changes quantity of an item in the wishlist", (done)=>{
            chai
                .request(app)
                .post("/wishlist/changeItemQuantity") 
                .send({
                    "secretKey": process.env.SECRET_KEY,
                    "productId": "25518241",
                    "variantId": "701642838739",
                    "quantity":"3"
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)

        // deletes an item from the wishlist
        it("Deletes an item from the wishlist", (done)=>{
            chai
                .request(app)
                .del("/wishlist/removeItem") 
                .send({
                    "secretKey": process.env.SECRET_KEY,
                    "productId": "25518241",
                    "variantId": "701642838739"
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)
    })

    describe("Order", ()=>{
        
        // get order page
        it("Gets order page", (done) =>{
            chai
                .request(app)
                .get("/order")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        })

        // get order history
        it("Gets order history", (done) =>{
            chai
                .request(app)
                .get("/order/history")
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)

        // issue an order
        it("Issues an order", (done)=>{
            chai
                .request(app)
                .post("/order") 
                .send(
                    {
                        "secretKey": process.env.SECRET_KEY,
                        "address": "unit testing",
                        "paymentId": "PAYID - Unit testing",
                        "items": [
                        {
                          "variant": {
                            "variation_values": {
                              "color": "C43",
                              "size": "33"
                            },
                            "price": 145,
                            "product_id": "883360544250",
                            "orderable": true
                          },
                          "_id": "5e7abe59ffc73c0e4453aa65",
                          "productId": "86736845",
                          "quantity": 1
                        }
                      ]
                    }
                )
                .end((err,res)=>{
                    expect(res).to.have.status(200)
                    expect(typeof res).to.equal('object')
                    done()
                })
        }).timeout(6000)
    })
})