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

    atualizar(req: Request, res: Response){
        return PossuiCompAluno.Alterar(req, res);
    }

}

export default new PossuiCompAlunoRoutes();