const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
await mongoose.connection.close();
});


describe("POST /signup", () => {
    it("should create a user", async () => {
        const res = await request(app)
            .post("/signup")
            .send({
                email: "nwaforglory12453@gmail.com",
                username: "Ebube23445",
                password: "Glory123"
            })
            .set('Accept', 'application/json');
        console.log(res.body, "response")
        expect(res.statusCode).toBe(201);
        
        // Adjust this expectation based on your actual API response structure
        // For example, if the username is directly in the response body:
        expect(res.body.user.username).toBe("Ebube23445");

        // Or, if it's nested within an object, adjust accordingly:
        // expect(res.body.user.username).toBe("Ebube234");
    });
});

