import { Request, Response } from 'express';

import VagasController from '../controllers/vagas.controller';

class VagasRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return VagasController.Criar(req, res);
    }

    atualizar(req: Request, res: Response){
        return VagasController.Alterar(req, res);
    }

    obterTodos(req: Request, res: Response){
        return VagasController.ObterTodos(req, res);
    }

    obterPorId(req: Request, res: Response){
        return VagasController.Obter(req, res);
    }
}

export default new VagasRoutes();