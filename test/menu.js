const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const menuModel = require("../models/menu")
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);
describe('Menu API', () => {

    /**
     * Test the GET route
     */
  describe("Get /api/menu",() =>{
  it("it should GET all menu items", (done)=>{
     chai.request(server)
     .get("/api/menu")
     .end((err, response) => {
         response.should.have.status(200);
         response.body.should.have.property('data');
         expect( response.body ).to.be.an('object');
       done();
     })
     })
  })
 /**
     * Test the GET (by id)   route
     */

  describe('/GET/api/menu:id menu', () => {
    it('it should GET a menu by the given id', (done) => {
        let menu = new menuModel({ name: "Dengu wali", price:300 });
        menu.save((err, menu) => {
            chai.request(server)
          .get('/api/menu/' + menu.id)
          .send(menu)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id').eql(menu.id);
            done();
          });
        });

    });
});
  
      /**
     * Test the POST route 
     */

       describe(" /api/menu",() =>{
        it("it should POST new menu item", (done)=>{
          const menu ={
            name:"chapati",
            price: 50
          }
           chai.request(server)
           .post("/api/menu/")
           .send(menu)
           .end((err, response) => {
             response.should.have.status(200);
            response.body.should.be.a('object');
             
             done();
           })
           })
        })
})
