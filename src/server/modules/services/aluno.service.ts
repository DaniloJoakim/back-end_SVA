import bcrypt from 'bcrypt';

import Database from '../../data/database';
import { BadRequestError, NotFoundError } from '../../api/responses/errors';

import { Aluno } from '../../types/models/aluno';
import { Cadastro } from '../../types/cadastro/cadastro';

class AlunoService {

    async Insere(cadastro: Cadastro) {
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                const retValidaEmail = await Database.ExecSQL("SELECT 1 FROM usuario WHERE email = ?", [cadastro.email]);
                const resValidaEmail = retValidaEmail.map((usuario: any) => usuario);
                if (resValidaEmail.length > 0) {
                    throw new BadRequestError("Já existe um cadastro com o e-mail informado.");
                }

                const salt = bcrypt.genSaltSync(10);
                cadastro.senha = bcrypt.hashSync(cadastro.senha, salt)

                const retUsuarioCadastrado = await Database.ExecSQL("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)", [cadastro.nome, cadastro.email, cadastro.senha]);

                const retAlunoCadastrado = await Database.ExecSQL("INSERT INTO aluno (nome, id_usuario) VALUES (?,?)", [cadastro.nome, retUsuarioCadastrado.insertId]);
                cadastro.id = retAlunoCadastrado.insertId;

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return cadastro;
    }

    async Atualiza(id: number, aluno: Aluno) {
        if (id != aluno.id){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL(" UPDATE aluno SET nome= ?, idade=?, sobrenome= ?, datNasc= ?, estado= ?, cidade= ?, pais= ?, telefone= ?, celular= ?, instituicao= ?, curso= ?, status=?, periodo= ?, semestre=?, inicio= ?, termino= ?, conclusao= ?, alunoEmail= ? WHERE id=?", 
                [aluno.nome, aluno.idade,aluno.sobrenome, aluno.datNasc, aluno.estado,  aluno.cidade,  aluno.pais,  aluno.telefone, aluno.celular, aluno.instituicao, aluno.curso,  aluno.status, aluno.periodo, aluno.semestre, aluno.inicio, aluno.termino, aluno.conclusao, aluno.alunoEmail, aluno.id]);
               
                
                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return aluno;
    }
    

    async BuscaTodos() {
        let alunos: Aluno[]= [];

        try {
            await Database.Open().then(async () => {
                alunos = await Database.ExecSQL("SELECT * FROM aluno");
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }
           
        return alunos;
    }

    async BuscaPorId(id: number) {
        let aluno: Aluno;

        try {
            await Database.Open().then(async () => {
                const ret = await Database.ExecSQL("SELECT * FROM aluno WHERE id = ?", [id]);

                const res = ret.map((aluno: any) => aluno);
                if (res.length == 0){
                    throw new NotFoundError();
                }

                aluno = res[0];
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return aluno;
    }
}

export default new AlunoService();
