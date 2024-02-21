// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");

describe("./musicians endpoint", () => {
  // Write your tests here

  test("Testing get musicians endpoint", async () => {
    const response = await request(app).get("/musicians");
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData[0]).toEqual(
      expect.objectContaining({
        name: "Mick Jagger",
        instrument: "Voice",
      })
    );
  });

  test("Testing get musicians/:id endpoint", async () => {
    const response = await request(app).get("/musicians/1");
    expect(response.statusCode).toBe(200);
    const responseData = JSON.parse(response.text);
    expect(responseData).toEqual(
      expect.objectContaining({
        name: "Mick Jagger",
        instrument: "Voice",
      })
    );
  });

  test("post musicians returns correct response", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({
        musician: {
          name: "50 Cent",
          instrument: "Voice",
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body[3]).toEqual(
      expect.objectContaining({
        name: "50 Cent",
        instrument: "Voice",
      })
    );
    const musicians = await Musician.findAll();
    expect(response.body.length).toBe(musicians.length);
  });

  test("put musicians returns correct response", async () => {
    const response = await request(app)
      .put("/musicians/4")
      .send({
        musician: {
          name: "Lil Wayne",
          instrument: "Voice",
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body[3]).toEqual(
      expect.objectContaining({
        name: "Lil Wayne",
        instrument: "Voice",
      })
    );
    const musicians = await Musician.findAll();
    expect(response.body.length).toBe(musicians.length);
  });

  test("delete musicians returns correct response", async () => {
    const response = await request(app).delete("/musicians/4");
    expect(response.statusCode).toBe(200);
    expect(response.body[3]).toEqual(undefined);
    const musicians = await Musician.findAll();
    expect(response.body.length).toBe(musicians.length);
  });
});
