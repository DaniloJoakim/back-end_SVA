import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import VagasService from '../services/vagas.service';
import { Vagas} from '../../types/models/vagas';

class VagasController {

    Criar(req: Request, res: Response) {
        let usuarioAdicionar: Vagas = req.body;
       VagasService
            .Insere(usuarioAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir nova vaga`))
    }

   Alterar(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        let usuarioAtualizar: Vagas = req.body;
        VagasService
            .Atualiza(id, usuarioAtualizar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar vaga`))
    }

   Obter(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        VagasService
            .BuscaPorId(id)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Vaga não encontrado`))
    }

    ObterTodos(req: Request, res: Response){
       VagasService
            .BuscaTodos()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todas as vaga`))
    }

}

export default new VagasController();
