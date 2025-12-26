import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";

import { app } from "@/app";

import { Order } from "@/infra/database/schema/Order";
import { User } from "@/infra/database/schema/User";

describe("Order routes", () => {
  let accessToken: string;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }
  });

  beforeEach(async () => {
    await Order.deleteMany({});
    await User.deleteMany({});

    await request(app).post("/users").send({
      email: "test@example.com",
      password: "password123",
    });

    const authResponse = await request(app).post("/users/auth").send({
      email: "test@example.com",
      password: "password123",
    });

    accessToken = authResponse.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("should be able to create a new order", async () => {
    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        lab: "Primeiro laboratório",
        patient: "João da Silva",
        customer: "Maria da Silva",
        services: [
          {
            name: "Exame de sangue",
            value: 150,
          },
        ],
      });

    expect(response.status).toBe(201);

    const orderInDb = await Order.findOne({ patient: "João da Silva" });
    expect(orderInDb).toBeTruthy();
  });

  it("should be able to advance a order", async () => {
    const response = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        lab: "Primeiro laboratório",
        patient: "João da Silva",
        customer: "Maria da Silva",
        services: [
          {
            name: "Exame de sangue",
            value: 150,
          },
        ],
      });

    const ordersInDb = await Order.findOne({ patient: "João da Silva" });
    expect(response.status).toBe(201);

    const advanceResponse = await request(app)
      .patch(`/orders/${ordersInDb?._id.toString()}/advance`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(advanceResponse.status).toBe(204);
  });

  it("should be able to get a order", async () => {
    await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        lab: "Primeiro laboratório",
        patient: "João da Silva",
        customer: "Maria da Silva",
        services: [
          {
            name: "Exame de sangue",
            value: 150,
          },
        ],
      });

    const ordersInDb = await Order.findOne({ patient: "João da Silva" }).lean();
    expect(ordersInDb).toBeTruthy();

    const order = await request(app)
      .get(`/orders/${ordersInDb?._id.toString()}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(order.status).toBe(200);
    expect(order.body.patient).toBe("João da Silva");
  });

  it("should be able to list all orders", async () => {
    await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        lab: "Primeiro laboratório",
        patient: "João da Silva",
        customer: "Maria da Silva",
        services: [
          {
            name: "Exame de sangue",
            value: 150,
          },
        ],
      });

    const orders = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(orders.status).toBe(200);
    // expect(orders.body.orders.length).toBe(1);
    // expect(orders.body.orders[0].patient).toBe("João da Silva");
  });

  it("should be able to delete a order", async () => {
    await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        lab: "Primeiro laboratório",
        patient: "João da Silva",
        customer: "Maria da Silva",
        services: [
          {
            name: "Exame de sangue",
            value: 150,
          },
        ],
      });

    const ordersInDb = await Order.findOne({ patient: "João da Silva" });
    expect(ordersInDb).toBeTruthy();

    const deleteResponse = await request(app)
      .delete(`/orders/${ordersInDb?._id.toString()}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(deleteResponse.status).toBe(204);
  });
});
