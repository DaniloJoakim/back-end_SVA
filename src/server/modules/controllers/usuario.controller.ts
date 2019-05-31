import { Request, Response } from 'express';
import * as _ from 'lodash';

import Handlers from '../../api/responses/handlers';
import UsuarioService from '../services/usuario.service';
import { Usuario } from '../../types/models/Usuario';

class UsuarioController {

    Criar(req: Request, res: Response) {
        let usuarioAdicionar: Usuario = req.body;
        UsuarioService
            .Insere(usuarioAdicionar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao inserir novo usuário`))
    }

   Alterar(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        let usuarioAtualizar: Usuario = req.body;
        UsuarioService
            .Atualiza(id, usuarioAtualizar)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao atualizar usuário`))
    }

   Obter(req: Request, res: Response) {
        let id: number = parseInt(req.params.id);
        UsuarioService
            .BuscaPorId(id)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Usuário não encontrado`))
    }

    ObterTodos(req: Request, res: Response){
        UsuarioService
            .BuscaTodos()
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, `Erro ao buscar todos os usuários`))
    }

    AlterarEmail(req: Request, res: Response){
        let id: number = parseInt(req.params.id);
        let usuarioAlteraEmail: Usuario = req.body;
        UsuarioService 
            .AtualizaEmail(id, usuarioAlteraEmail)
            .then(_.partial(Handlers.onSuccess, res))
            .catch(_.partial(Handlers.onError, res, 'Erro ao alterar o e-mail'))
    }
}

export default new UsuarioController();
