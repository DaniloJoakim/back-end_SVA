import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import RelacionaService from '../services/rel-aluno-vaga.service';
//import { Relaciona } from '../../types/models/rel-aluno-vaga';

class RelacionaController {
    Obter(req: Request, res: Response) {
            let id: number = parseInt(req.params.id);
            RelacionaService
                .BuscaPorId(id)
                .then(_.partial(Handlers.onSuccess, res))
                .catch(_.partial(Handlers.onError, res, `Vagas não encontradas`))
        }

   

    }
export default new RelacionaController();