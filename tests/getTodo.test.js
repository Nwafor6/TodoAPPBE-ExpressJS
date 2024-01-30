const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
// const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
  });
  
/* Closing database connection after each test. */
afterEach(async () => {
await mongoose.connection.close();
});



describe("GET /todos", () => {
    it("should return all todos", async () => {
        const res = await request(app).get("/todos");
        expect(res.statusCode).toBe(200);
        // console.log(res.body, "Helooo")
        expect(res.body.length).toBeGreaterThan(0);
    });
});
