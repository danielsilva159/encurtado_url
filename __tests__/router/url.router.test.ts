import request from "supertest";
import AppDataSource from "../../src/databases";
import configApp, { mockDataSource } from "../dadosMocks";

const app = configApp;

describe("Url", () => {
  beforeAll(() => {
    jest
      .spyOn(AppDataSource, "getRepository")
      .mockImplementation(mockDataSource.getRepository);
  });
  it("[POST - SUCCESS] /url - Inclusão de url encurtada ", async () => {
    const response = await await request(app)
      .post("/api/v1/url")
      .send({ url: "https://www.google.com" })
      .set("Authorization", "Bearer valid_token")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.statusCode).toBe(200);
  });

  it("[GET - SUCCESS] /url - Listar urls encurtadas do usuário logado ", async () => {
    const response = await await request(app)
      .get("/api/v1/url")
      .set("Authorization", "Bearer valid_token")
      .set("Accept", "application/json")
      .expect(200);
    expect(response.statusCode).toBe(200);
  });
});
