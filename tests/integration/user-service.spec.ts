import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "@/app";
import { User } from "@/infra/database/schema/User";

describe("User Routes", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGO_URI_TEST || "mongodb://localhost:27017/test_db"
      );
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});

    const userInDb = await User.findOne({ email: "test@example.com" });
    expect(userInDb).toBeTruthy();
  });

  it("should be able to make authenticate", async () => {
    await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
    });

    const response = await request(app).post("/users/auth").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  it("should be able to make authenticate and get user", async () => {
    await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
    });

    const response = await request(app).post("/users/auth").send({
      email: "test@example.com",
      password: "password123",
    });

    console.log(response.status, response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");

    const token = response.body.token;

    const userResponse = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(userResponse.status).toBe(200);
    expect(userResponse.body).toHaveProperty("email", "test@example.com");
  });
});
