import { Request, Response } from 'express';
import * as _ from 'lodash';
import UsuarioService from '../services/usuario.service';
import Handlers from '../../api/responses/handlers';

class TokenRoutes {

  auth(req: Request, res: Response) {
    const credenciais = {
        email: req.body.email,
        senha: req.body.senha
    };

    if(credenciais.hasOwnProperty('email') && credenciais.hasOwnProperty('senha')) {
        UsuarioService
            .BuscaPorEmail(credenciais.email)
            .then(_.partial(Handlers.authSuccess, res, credenciais))
            .catch(_.partial(Handlers.authFail, req, res));
    }
  }
}

export default new TokenRoutes();
