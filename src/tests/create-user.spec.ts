import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app"; // Importe seu app express aqui
import { User } from "../database/schema/User";

describe("User Routes", () => {
  // Conecta a um banco de teste antes de rodar os testes
  beforeAll(async () => {
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState === 0) {
      const url =
        process.env.MONGO_URI_TEST || "mongodb://localhost:27017/test_db";
      await mongoose.connect(url);
    }
  });

  // Limpa o banco e fecha a conexão após os testes
  afterAll(async () => {
    await User.deleteMany({}); // Limpa usuários criados
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

    // Verifica se realmente salvou no banco
    const userInDb = await User.findOne({ email: "test@example.com" });
    expect(userInDb).toBeTruthy();
  });

  // it("should not be able to create a user with an existing email", async () => {
  //   // Tenta criar o mesmo usuário novamente
  //   const response = await request(app).post("/users").send({
  //     email: "test@example.com",
  //     password: "password123",
  //   });

  //   expect(response.status).toBe(409);
  //   expect(response.body).toHaveProperty("message", "User already exists");
  // });
});
