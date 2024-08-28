import { NextFunction, Request, Response } from "express";
import AppError from "../erros/appError";
import { verify } from "jsonwebtoken";

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
    const token = request.headers.authorization?.split("Bearer")[1].trim();
    if (!token) {
      throw new AppError("Usuario não autorizado", 401);
    }
    const secret = process.env.APP_SECRET || "";

    verify(token, secret, (error, decoded) => {
      if (error) {
        throw new AppError("Falha na autenticação", 500);
      }
    });
    next();
  }
}
export default Auth;
