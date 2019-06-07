import { Application } from 'express';

import AlunoRoutes from '../../modules/routes/aluno.routes';
import UsuarioRoutes from '../../modules/routes/usuario.routes';
import TokenRoutes from '../../modules/routes/token.routes';
import EmpresaRoutes from '../../modules/routes/empresa.routes';
import RelacionaRoutes from '../../modules/routes/relaciona.routes';
import VagasRoutes from '../../modules/routes/vagas.routes';
import CompentciaRoutes from '../../modules/routes/competencia.routes';
import PossuiCompAluno from '../../modules/routes/pca.routes';
import PossuiCompVaga from '../../modules/routes/pcv.routes';
class Routes {

    private tokenRoute: any;

    constructor() {
        this.tokenRoute = TokenRoutes;
    }

    initRoutes(app: Application, authz: any): void {
        app.route('/token').post(this.tokenRoute.auth);

        app.route('/alunos').post(AlunoRoutes.criar);
        app.route('/alunos/:id').all(authz).put(AlunoRoutes.atualizar);
        app.route('/alunos/:id').all(authz).get(AlunoRoutes.obterPorId);
        app.route('/alunos').all(authz).get(AlunoRoutes.obterTodos);

        app.route('/usuarios').all(authz).post(UsuarioRoutes.criar);
        app.route('/usuarios/:id').all(authz).put(UsuarioRoutes.atualizar);
        app.route('/usuarios/:id').all(authz).get(UsuarioRoutes.obterPorId);
        app.route('/usuarios').all(authz).get(UsuarioRoutes.obterTodos);
        app.route('/usuarios/:id/alterar-email').all(authz).put(UsuarioRoutes.atualizarEmail);
        
        app.route('/empresa').all(authz).post(EmpresaRoutes.criar);
        app.route('/empresa').all(authz).put(EmpresaRoutes.atualizar);
        app.route('/empresa/:id').all(authz).get(EmpresaRoutes.obterPorId);
        app.route('/empresa').all(authz).get(EmpresaRoutes.obterTodos);

        app.route('/ranking/:id').all(authz).get(RelacionaRoutes.obterPorId);

        app.route('/aluno/competencia').all(authz).post(PossuiCompAluno.criar);
        app.route('/aluno/competencia/:id').all(authz).get(PossuiCompAluno.obterPorId);
        app.route('/aluno/competencia/relacionadas/:id').all(authz).get(PossuiCompAluno.obterPorIdComp);
        app.route('/aluno/competencia/atualizar/:id').all(authz).put(PossuiCompAluno.atualizar);

        app.route('/aluno/competencia/excluir').all(authz).put(PossuiCompAluno.remover);

        app.route('/vaga/competencia').all(authz).post(PossuiCompVaga.criar);
        app.route('/vaga/competencia/:id').all(authz).get(PossuiCompVaga.obterPorId);

        app.route('/vagas').all(authz).post(VagasRoutes.criar);
        app.route('/vagas/:id').all(authz).put(VagasRoutes.atualizar);
        app.route('/vagas/:id').all(authz).get(VagasRoutes.obterPorId);
        app.route('/vagas').all(authz).get(VagasRoutes.obterTodos);

        app.route('/competencia').all(authz).post(CompentciaRoutes.criar);
        app.route('/competencia/:id').all(authz).put(CompentciaRoutes.atualizar);
        app.route('/competencia/:id').all(authz).get(CompentciaRoutes.obterPorId);
        app.route('/competencia').all(authz).get(CompentciaRoutes.obterTodos);
    }
}

export default new Routes();
