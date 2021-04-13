const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const orderModel = require("../models/order")
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);
describe('order API', () => {

    /**
     * Test the GET route
     */
  describe("Get /api/order",() =>{
  it("it should GET all order items", (done)=>{
     chai.request(server)
     .get("/api/orders")
     .end((err, response) => {
         response.should.have.status(200);
         response.body.should.have.property('data');
         expect( response.body ).to.be.an('object');
       done();
     })
     })
  })

      /**
     * Test the POST route 
     */

       describe(" /api/order",() =>{
        it("it should POST new order item", (done)=>{
          const order ={

            userPhoneNumber:"+254704868023",
            menuItemId:"6074a9a05ff00a7066009513"
        }
           chai.request(server)
           .post("/api/order/")
           .send(order)
           .end((err, response) => {
             response.should.have.status(200);
            response.body.should.be.a('object');
             
             done();
           })
           })
        })
})
