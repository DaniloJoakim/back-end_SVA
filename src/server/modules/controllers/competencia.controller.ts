import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import CompetenciaService from '../services/competencia.services';
import { Competencia } from '../../types/models/competencia';

class CompetenciaController {

    Criar(req: Request, res: Response) {
        let compAdicionar: Competencia = req.body;
        CompetenciaService
            .Insere(compAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir nova competência`))
    }

   Alterar(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        let compAtualizar: Competencia = req.body;
        CompetenciaService
            .Atualiza(id, compAtualizar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar competência`))
    }

   Obter(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        CompetenciaService
            .BuscaPorId(id)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Competência não encontrado`))
    }

    ObterTodos(req: Request, res: Response){
       CompetenciaService
            .BuscaTodos()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todas as competência`))
    }

}

export default new CompetenciaController();
