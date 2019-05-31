import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import HTTPStatus from 'http-status';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { BadRequestError, NotFoundError } from './errors';

class Handlers {

    constructor(){}

    onSuccess(res: Response, data: any){
        return res.status(HTTPStatus.OK).json({ payload: data });
    }

    onError(res: Response, message: string, err: any) {
        console.log(`Error: ${err}`);
        let code: number;
        if (err instanceof NotFoundError) {
            code = HTTPStatus.NOT_FOUND;
            message = err.message || message;
        } else if (err instanceof BadRequestError) {
            code = HTTPStatus.BAD_REQUEST;
            message = err.message || message;
        } else {
            code = HTTPStatus.INTERNAL_SERVER_ERROR;
        }
        return res.status(code).json({ mensagem: message });
    }

    authSuccess(res: Response, credenciais: any, data: any) {
        const isMatch = bcrypt.compareSync(credenciais.senha, data.senha);
        if(isMatch) {
            const token = jwt.sign({sub: data.email, iss: "api"}, process.env.SECRET || '');
            return res.status(HTTPStatus.OK).json({ nome: data.nome, email: data.email, token: token});
        } else {
            return res.status(HTTPStatus.FORBIDDEN).json({ mensagem: "Credenciais inválidas." });
        }
    }

    authFail(req: Request, res: Response) {
        return res.status(HTTPStatus.FORBIDDEN).json({ mensagem: "Dados inválidos." });
    }

    errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
        console.error(`API error handler foi executada: ${err}`);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ mensagem: "Erro interno do servidor." });
    }

    notFoundHandlerApi(req: Request, res: Response, next: NextFunction) {
        console.error(`API notFound handler foi executada: ${req.url}`);
        return res.status(HTTPStatus.NOT_FOUND).json({ mensagem: `Rota '${req.url}' não encontrada.` });
    }

    authzHandlerApi(req: Request, resp: Response, next: NextFunction) {
        let token = undefined;
        if (req.headers && req.headers.authorization) {
            //Autorization: Bearer ZZZ.ZZZ.ZZZ
            const parts: string[] = req.headers.authorization.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                token = parts[1];
            }
        }
        if (!token) {
            resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
            resp.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: "Você precisa se autenticar." });
        } else {
            jwt.verify(token, process.env.SECRET || '', (error: any, decoded: any) => {
                if (decoded) {
                    next();
                } else {
                    resp.status(HTTPStatus.UNAUTHORIZED).json({ mensagem: "Acesso não autorizado." });
                }
            });
        }
    }
}

export default new Handlers();
