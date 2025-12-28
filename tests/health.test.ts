import { describe, it, expect } from "vitest"
import request from "supertest"
import app from '../src/index'

describe("health check", () => {
    it("returns 200 and OK response", async () => {
        const res = await request(app).get("/health")

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ "message": "OK" })
    })
})