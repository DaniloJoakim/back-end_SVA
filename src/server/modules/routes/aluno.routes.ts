import { Request, Response } from 'express';

import AlunoController from '../controllers/aluno.controller';

class AlunoRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return AlunoController.Criar(req, res);
    }

    atualizar(req: Request, res: Response){
        return AlunoController.Alterar(req, res);
    }

    obterTodos(req: Request, res: Response){
        return AlunoController.ObterTodos(req, res);
    }

    obterPorId(req: Request, res: Response){
        return AlunoController.Obter(req, res);
    }

}

export default new AlunoRoutes();
