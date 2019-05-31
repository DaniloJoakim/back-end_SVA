import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import AlunoService from '../services/aluno.service';
import { Aluno } from '../../types/models/Aluno';
import { Cadastro } from '../../types/cadastro/cadastro';

class AlunoController {

    Criar(req: Request, res: Response) {
        let alunoAdicionar: Cadastro = req.body;
        AlunoService
            .Insere(alunoAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo aluno`))
    }

    Alterar(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        let alunoAtualizar: Aluno = req.body;
        AlunoService
            .Atualiza(id, alunoAtualizar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar aluno`))
    }

    Obter(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        AlunoService
            .BuscaPorId(id)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Aluno não encontrado`))
    }

    ObterTodos(req: Request, res: Response) {
        AlunoService
            .BuscaTodos()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os alunos`))
    }
}

export default new AlunoController();
