import { Request, Response } from 'express';

import EmpresaController from '../controllers/empresa.controller';

class EmpresaRoutes {

    constructor(){}

    criar(req: Request, res: Response){
        return EmpresaController.Criar(req, res);
    }

    atualizar(req: Request, res: Response){
        return EmpresaController.Alterar(req, res);
    }

    obterTodos(req: Request, res: Response){
        return EmpresaController.ObterTodos(req, res);
    }

    obterPorId(req: Request, res: Response){
        return EmpresaController.Obter(req, res);
    }

}

export default new EmpresaRoutes();
