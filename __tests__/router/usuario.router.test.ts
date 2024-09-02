import request from "supertest";
import configApp, { mockDataSource } from "../dadosMocks";
import AppDataSource from "../../src/databases";

const app = configApp;

beforeAll(() => {
  jest
    .spyOn(AppDataSource, "getRepository")
    .mockImplementation(mockDataSource.getRepository);
});

describe("Usuario", () => {
  it("[POST - SUCCESS] /usuario - Inclusão de usuario ", async () => {
    const response = await request(app).post("/api/v1/usuario").send({
      nome: "Test",
      email: "teste@email.com",
      senha: "123456",
    });

    expect(response.statusCode).toBe(200);
  });
});
