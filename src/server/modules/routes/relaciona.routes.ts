import { Request, Response } from 'express';

import RelacionaController from '../controllers/rel-aluno-vaga.controller';

class RelacionaRoutes {

 constructor(){}

    obterPorId(req: Request, res: Response){
            return RelacionaController.Obter(req, res);
        }

    
    obterCompId(req: Request, res: Response){
            return RelacionaController.Obter(req, res);
        }
    }

export default new RelacionaRoutes();