import { Request, Response } from 'express';

import CompetenciaController from '../controllers/competencia.controller';

class CompetenciaRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return CompetenciaController.Criar(req, res);
    }

    atualizar(req: Request, res: Response){
        return CompetenciaController.Alterar(req, res);
    }

    obterTodos(req: Request, res: Response){
        return CompetenciaController.ObterTodos(req, res);
    }

    obterPorId(req: Request, res: Response){
        return CompetenciaController.Obter(req, res);
    }

}

export default new CompetenciaRoutes();
