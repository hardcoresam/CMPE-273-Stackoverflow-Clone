var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;
ROOT_URL = "http://localhost:4000";
let jwtToken = null;

describe("Post -- Registration of User",()=>{
    const data = {
        displayName: "aravind1",
        email: "aravind1@gmail.com",
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

describe("Post -- Login of user",()=>{    
    const data = {
        email: 'aravind@gmail.com',
        password: '12345',
    };
    const data1 = {
        email: 'aravind5@gmail.com',
        password: '12345',
    };
    it("login with valid credentials",(done)=>{
        chai.request.agent(app)
        .post("/api/users/login")
        .send(data)
        .then(function (res){
            expect(res).to.have.status(200);
            jwtToken = res.body.token;
            console.log(jwtToken)
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
    it("login with invalid credentials",(done)=>{
        chai.request.agent(app)
        .post("/api/users/login")
        .send(data1)
        .then(function (res){
            expect(res).to.have.status(400);
            done();
        })
        .catch((e) => {
            done(e);
          });
    })
})

describe("Post -- Create a question of user", () => {
    const data = {
        type: "QUESTION",
        status: "ACTIVE",
        title: "content",
        tags: "javascript",
        body: "body"
    };
    it("create a question for user",(done)=>{
        chai.request.agent(app)
        .post("/api/post/question")
        .send(data)
        .set('cookie', 'access-token=' + jwtToken)
        .then(function (res){
            expect(res).to.have.status(200);
            // jwtToken = res.body.token;
            // console.log(jwtToken)
            console.log(res.body)
            done();
        })
        .catch((e) => {
            done(e);
          });
    })

    it("create a question for invalid user", (done) => {
        chai.request.agent(app)
            .post("/api/post/question")
            .send(data)
            .set('cookie', 'access-token=' + jwtToken + "xx")
            .then(function (res) {
                expect(res).to.have.status(401);
                done();
            })
            .catch((e) => {
                done(e);
            });
    })
})

describe("Get -- Get all questions", () => {
    it("get all questions", (done) => {
        chai.request.agent(app)
            .get("/api/post/dashboard")
            .set('cookie', 'access-token=' + jwtToken)
            .then(function (res) {
                expect(res).to.have.status(200);
                console.log(res.body)
                done();
            })
            .catch((e) => {
                done(e);
            });
    })

    it("get all questions for unregistered user", (done) => {
        chai.request.agent(app)
            .get("/api/post/dashboard")
            .then(function (res) {
                expect(res).to.have.status(200);
                done();
            })
            .catch((e) => {
                done(e);
            });
    })
})

describe("Get -- Get all tags", () => {
    it("get all tags", (done) => {
        chai.request.agent(app)
            .get("/api/tags/")
            .then(function (res) {
                expect(res).to.have.status(200);
                console.log(res.body)
                done();
            })
            .catch((e) => {
                done(e);
            });
    })
})