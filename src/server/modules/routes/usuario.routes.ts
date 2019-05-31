import { Request, Response } from 'express';

import UsuarioController from '../controllers/usuario.controller';

class UsuarioRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return UsuarioController.Criar(req, res);
    }

    atualizar(req: Request, res: Response){
        return UsuarioController.Alterar(req, res);
    }

    obterTodos(req: Request, res: Response){
        return UsuarioController.ObterTodos(req, res);
    }

    obterPorId(req: Request, res: Response){
        return UsuarioController.Obter(req, res);
    }

    atualizarEmail(req: Request, res: Response){
        return UsuarioController.AlterarEmail(req, res);
    }
}

export default new UsuarioRoutes();
