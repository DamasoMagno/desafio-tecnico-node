import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app"; // Importe seu app express aqui
import { User } from "../database/schema/User";

describe("User Routes", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGO_URI_TEST || "mongodb://localhost:27017/test_db"
      );
    }
  });

  // Limpa o banco ANTES de cada teste
  beforeEach(async () => {
    await User.deleteMany({});
  });

  // Fecha a conexão DEPOIS de todos os testes
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User created successfully"
    );

    const userInDb = await User.findOne({ email: "test@example.com" });
    expect(userInDb).toBeTruthy();
  });

  it("should be able to make authenticate", async () => {
    const response = await request(app).post("/users/auth").send({
      email: "test@example.com",
      password: "password123",
    });

    console.log(response.status, response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });
});
