import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import EmpresaService from '../services/empresa.service';
import { Empresa } from '../../types/models/empresa';
import { CadastroEmp } from '../../types/cadastro/cadastro';

class EmpresaController {

    Criar(req: Request, res: Response) {
        let empresaAdicionar: CadastroEmp = req.body;
        EmpresaService
            .Insere(empresaAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir nova empresa`))
    }

    Alterar(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        let empresaAtualizar: Empresa = req.body;
       EmpresaService
            .Atualiza(id, empresaAtualizar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar empresa`))
    }

    Obter(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        EmpresaService
            .BuscaPorId(id)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Empresa não encontrado`))
    }

    ObterTodos(req: Request, res: Response) {
        EmpresaService
            .BuscaTodos()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos as empresas`))
    }
}

export default new EmpresaController();
