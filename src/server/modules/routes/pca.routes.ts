import { Request, Response } from 'express';

import PossuiCompAluno from '../controllers/pca.controller';

class PossuiCompAlunoRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return PossuiCompAluno.Criar(req, res);
    }

    obterPorId(req: Request, res: Response){
        return PossuiCompAluno.ObterPorId(req, res);
    }

    obterPorIdComp(req: Request, res: Response){
        return PossuiCompAluno.ObterCompId(req, res);
    }

    atualizar(req: Request, res: Response){
        return PossuiCompAluno.Alterar(req, res);
    }

    remover(req: Request, res: Response){
        return PossuiCompAluno.Remover(req, res);
    }

}

export default new PossuiCompAlunoRoutes();