import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import PossuiAlunoCompService from '../services/pca.service';
import { PossuiAlunoComp} from '../../types/models/possui.aluno.vaga';

class VagasController {

    Criar(req: Request, res: Response) {
        let dadosAdicionar: PossuiAlunoComp = req.body;
        PossuiAlunoCompService
            .Insere(dadosAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir dados na tabela POSSUI_COMP_ALUNO`))
    }

    ObterPorId(req: Request, res: Response) {
         let id: number = parseInt(req.params.id);
        PossuiAlunoCompService
            .BuscaTodos(id)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar dados na tabela POSSUI_COMP_ALUNO`))
    }

    Alterar(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        let alunoAtualizar: PossuiAlunoComp = req.body;
        PossuiAlunoCompService
            .Atualiza(id, alunoAtualizar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar aluno`))
    }


}

export default new VagasController();
