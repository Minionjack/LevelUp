import { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { build } from "@/index";
import { closeDatabase, query } from "@/services/database";
import { closeRedis } from "@/services/redis";

describe("habit routes", () => {
  let app: FastifyInstance;
  let token: string;
  let otherToken: string;
  const email = `test-habits-${Date.now()}@example.com`;
  const otherEmail = `test-habits-other-${Date.now()}@example.com`;
  const password = "password123";

  beforeAll(async () => {
    app = await build();
    await app.ready();

    const register = await request(app.server)
      .post("/api/v1/auth/register")
      .send({
        email,
        password,
        username: `testhabits${Date.now()}`,
        first_name: "Test",
        last_name: "Habits",
      });
    token = register.body.data.token;

    const registerOther = await request(app.server)
      .post("/api/v1/auth/register")
      .send({
        email: otherEmail,
        password,
        username: `testhabitsother${Date.now()}`,
        first_name: "Other",
        last_name: "User",
      });
    otherToken = registerOther.body.data.token;
  });

  afterAll(async () => {
    await query("DELETE FROM users WHERE email IN ($1, $2)", [
      email,
      otherEmail,
    ]);
    await app.close();
    await closeDatabase();
    await closeRedis();
  });

  it("rejects listing habits without a token", async () => {
    const res = await request(app.server).get("/api/v1/habits");
    expect(res.status).toBe(401);
  });

  it("starts with an empty habit list for a new user", async () => {
    const res = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it("creates a habit", async () => {
    const res = await request(app.server)
      .post("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Morning Run",
        frequency: "daily",
        target_value: 1,
        target_unit: "times",
      });

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("Morning Run");
    expect(res.body.data.user_id).toBeDefined();
    expect(res.body.data.current_streak).toBe(0);
    expect(res.body.data.total_completions).toBe(0);
  });

  it("rejects creating a habit with an invalid frequency", async () => {
    const res = await request(app.server)
      .post("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Bad Habit", frequency: "yearly" });

    expect(res.status).toBe(400);
  });

  it("lists the created habit", async () => {
    const res = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe("Morning Run");
  });

  it("completes a habit and increments streak/completion counters", async () => {
    const list = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);
    const habitId = list.body.data[0].id;

    const res = await request(app.server)
      .post(`/api/v1/habits/${habitId}/complete`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.data.current_streak).toBe(1);
    expect(res.body.data.longest_streak).toBe(1);
    expect(res.body.data.total_completions).toBe(1);

    // Completing again should keep extending the streak.
    const res2 = await request(app.server)
      .post(`/api/v1/habits/${habitId}/complete`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res2.body.data.current_streak).toBe(2);
    expect(res2.body.data.total_completions).toBe(2);
  });

  it("persists the completion across a fresh fetch (simulating app restart)", async () => {
    const res = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body.data[0].current_streak).toBe(2);
    expect(res.body.data[0].total_completions).toBe(2);
  });

  it("updates a habit", async () => {
    const list = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);
    const habitId = list.body.data[0].id;

    const res = await request(app.server)
      .put(`/api/v1/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Evening Run" });

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Evening Run");
  });

  it("does not let one user see or modify another user's habit", async () => {
    const list = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);
    const habitId = list.body.data[0].id;

    const getRes = await request(app.server)
      .get(`/api/v1/habits/${habitId}`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(getRes.status).toBe(404);

    const completeRes = await request(app.server)
      .post(`/api/v1/habits/${habitId}/complete`)
      .set("Authorization", `Bearer ${otherToken}`)
      .send({});
    expect(completeRes.status).toBe(404);

    const otherList = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${otherToken}`);
    expect(otherList.body.data).toEqual([]);
  });

  it("deletes a habit", async () => {
    const list = await request(app.server)
      .get("/api/v1/habits")
      .set("Authorization", `Bearer ${token}`);
    const habitId = list.body.data[0].id;

    const del = await request(app.server)
      .delete(`/api/v1/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(del.status).toBe(204);

    const getRes = await request(app.server)
      .get(`/api/v1/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getRes.status).toBe(404);
  });
});
