import { NextFunction, Request, Response } from "express";
import AppError from "../erros/appError";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import ROTAS_PUBLICAS from "./routes.config";

interface Usuario {
  nome: string;
  email: string;
}

class Auth {
  async verificarToken(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers.authorization;
    const rota = ROTAS_PUBLICAS.find(
      (rota) => request.method === rota.method && request.url === rota.url
    );
    if (rota && !authHeader) {
      return next();
    }

    if (!authHeader) {
      throw new AppError("Token não informado", 401);
    }
    const [, token] = authHeader.split(" ");
    if (!token) {
      throw new AppError("Usuario não autorizado", 401);
    }
    const secret = process.env.APP_SECRET || "";
    verify(token, secret, (error, decoded) => {
      if (error) {
        throw new AppError("Falha na autenticação", 500);
      }
      if (decoded && typeof decoded !== "string") {
        request.user = decoded.data;
      }
    });

    return next();
  }
}
export default Auth;
