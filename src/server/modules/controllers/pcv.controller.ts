import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import PossuiVagaCompService from '../services/pcv.service';
import { PossuiVagaComp} from '../../types/models/possui.aluno.vaga';

class VagasController {

    Criar(req: Request, res: Response) {
        let dadosAdicionar: PossuiVagaComp = req.body;
        PossuiVagaCompService
            .Insere(dadosAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir dados na tabela POSSUI_COMP_VAGA`))
    }

    ObterPorId(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        PossuiVagaCompService
           .BuscaTodos(id)
           .then(_.partial(Handlers.onSuccess, res))
           .catch(_.partial(Handlers.onError, res, `Erro ao buscar dados na tabela POSSUI_COMP_VAGA`))
   }

}

export default new VagasController();
