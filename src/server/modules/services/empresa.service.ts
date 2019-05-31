import bcrypt from 'bcrypt';

import Database from '../../data/database';
import { BadRequestError, NotFoundError } from '../../api/responses/errors';

import { Empresa } from '../../types/models/empresa';
import { CadastroEmp } from '../../types/cadastro/cadastro';

class EmpresaService {

    async Insere(cadastro: CadastroEmp) {
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

                const retEmpresaCadastrado = await Database.ExecSQL("INSERT INTO empresa (nome, id_usuario) VALUES (?,?)", [cadastro.nome, retUsuarioCadastrado.insertId]);
                cadastro.id = retEmpresaCadastrado.insertId;

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return cadastro;
    }

    async Atualiza(id: number, empresa: Empresa) {
        if (id != empresa.id){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("UPDATE empresa SET nome = ? WHERE id = ?", [empresa.nome, empresa.id]);

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return empresa;
    }
    

    async BuscaTodos() {
        let empresa: Empresa[]= [];

        try {
            await Database.Open().then(async () => {
                empresa = await Database.ExecSQL("SELECT * FROM empresa");
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return empresa;
    }

    async BuscaPorId(id: number) {
        let empresa: Empresa;

        try {
            await Database.Open().then(async () => {
                const ret = await Database.ExecSQL("SELECT * FROM empresa WHERE id = ?", [id]);

                const res = ret.map((empresa: any) => empresa);
                if (res.length == 0){
                    throw new NotFoundError();
                }

                empresa= res[0];
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return empresa;
    }
}

export default new EmpresaService();
