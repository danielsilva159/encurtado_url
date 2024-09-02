import express, { NextFunction, Request, Response } from "express";
import ROTAS_PUBLICAS from "../src/config/routes.config";
import AppError from "../src/erros/appError";
import routes from "../src/router";

class ConfigApp {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(this.verificarToken);
    this.app.use(routes);
  }

  async verificarToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers.authorization;
    const rotas = ROTAS_PUBLICAS.find(
      (rota) => request.method === rota.method && request.url.includes(rota.url)
    );

    if (rotas && !authHeader) {
      return next();
    }

    if (!authHeader) {
      throw new AppError("Token não informado", 401);
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      throw new AppError("Usuario não autorizado", 401);
    }
    request.user = { id: 1 };
    return next();
  }
}

export default new ConfigApp().app;

const mockManager = {
  findOne: jest.fn(),
  save: jest.fn(),
  createQueryBuilder: jest
    .fn()
    .mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
    }),
  // Adicione mais métodos que você quer mockar
};

export const mockDataSource = {
  getRepository: jest.fn().mockReturnValue(mockManager),
  initialize: jest.fn(),
  destroy: jest.fn(),
  // Adicione mais métodos conforme necessário
};
