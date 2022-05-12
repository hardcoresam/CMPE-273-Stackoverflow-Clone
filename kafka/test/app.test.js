var app=require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
ROOT_URL = "http://localhost:4000";

describe("Post -- Registration of User",()=>{
    const data = {
        displayName: "aravind",
        email: "aravind@gmail.com",
        password: "12345"
    };
    it("succesfully registered",(done)=>{
        chai.request.agent(app)
        .post("/api/users/register")
        .send(data)
        .then(function (res){
            expect(res).to.have.status(200);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
    it("Register with previously exisiting emailId",(done)=>{
        chai.request.agent(app)
        .post("/api/users/register")
        .send(data)
        .then(function (res){
            expect(res).to.have.status(400);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})