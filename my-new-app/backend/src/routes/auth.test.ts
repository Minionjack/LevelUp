import { FastifyInstance } from "fastify";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { build } from "@/index";
import { closeDatabase, query } from "@/services/database";
import { closeRedis } from "@/services/redis";

describe("auth routes", () => {
  let app: FastifyInstance;
  const email = `test-auth-${Date.now()}@example.com`;
  const username = `testauth${Date.now()}`;
  const password = "password123";

  beforeAll(async () => {
    app = await build();
    await app.ready();
  });

  afterAll(async () => {
    await query("DELETE FROM users WHERE email = $1", [email]);
    await app.close();
    await closeDatabase();
    await closeRedis();
  });

  it("registers a new user and returns tokens", async () => {
    const res = await request(app.server).post("/api/v1/auth/register").send({
      email,
      password,
      username,
      first_name: "Test",
      last_name: "User",
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(email);
    expect(res.body.data.user.password_hash).toBeUndefined();
    expect(typeof res.body.data.token).toBe("string");
    expect(typeof res.body.data.refreshToken).toBe("string");
  });

  it("rejects registering the same email twice", async () => {
    const res = await request(app.server)
      .post("/api/v1/auth/register")
      .send({
        email,
        password,
        username: `${username}-dup`,
        first_name: "Test",
        last_name: "User",
      });

    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe("USER_EXISTS");
  });

  it("rejects registration with an invalid payload", async () => {
    const res = await request(app.server).post("/api/v1/auth/register").send({
      email: "not-an-email",
      password: "short",
    });

    expect(res.status).toBe(400);
  });

  it("logs in with correct credentials", async () => {
    const res = await request(app.server).post("/api/v1/auth/login").send({
      email,
      password,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.user.email).toBe(email);
    expect(typeof res.body.data.token).toBe("string");
  });

  it("rejects login with the wrong password", async () => {
    const res = await request(app.server).post("/api/v1/auth/login").send({
      email,
      password: "wrong-password",
    });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("rejects login for a nonexistent email", async () => {
    const res = await request(app.server).post("/api/v1/auth/login").send({
      email: "nobody@example.com",
      password,
    });

    expect(res.status).toBe(401);
  });

  it("returns the current user for a valid token", async () => {
    const login = await request(app.server)
      .post("/api/v1/auth/login")
      .send({ email, password });

    const res = await request(app.server)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${login.body.data.token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe(email);
  });

  it("rejects /me with no Authorization header", async () => {
    const res = await request(app.server).get("/api/v1/auth/me");
    expect(res.status).toBe(401);
  });

  it("rejects /me with a garbage token", async () => {
    const res = await request(app.server)
      .get("/api/v1/auth/me")
      .set("Authorization", "Bearer not-a-real-token");
    expect(res.status).toBe(401);
  });

  it("issues a new token pair from a valid refresh token", async () => {
    const login = await request(app.server)
      .post("/api/v1/auth/login")
      .send({ email, password });

    const res = await request(app.server)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: login.body.data.refreshToken });

    expect(res.status).toBe(200);
    expect(typeof res.body.data.token).toBe("string");
    expect(typeof res.body.data.refreshToken).toBe("string");
  });

  it("rejects refresh with an access token instead of a refresh token", async () => {
    const login = await request(app.server)
      .post("/api/v1/auth/login")
      .send({ email, password });

    const res = await request(app.server)
      .post("/api/v1/auth/refresh")
      .send({ refreshToken: login.body.data.token });

    expect(res.status).toBe(401);
  });

  it("logs out with a valid token", async () => {
    const login = await request(app.server)
      .post("/api/v1/auth/login")
      .send({ email, password });

    const res = await request(app.server)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${login.body.data.token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
