import { Request, Response } from 'express';

import PossuiVagaAluno from '../controllers/pcv.controller';

class PossuiCompAlunoRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return PossuiVagaAluno.Criar(req, res);
    }

    obterPorId(req: Request, res: Response){
        return PossuiVagaAluno.ObterPorId(req, res);
    }

}

export default new PossuiCompAlunoRoutes();