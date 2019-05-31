import bcrypt from 'bcrypt';

import Database from '../../data/database';
import { Usuario } from '../../types/models/usuario';
import { BadRequestError, NotFoundError } from '../../api/responses/errors';

class UsuarioService {

    async Insere(usuario: Usuario) {
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                const salt = bcrypt.genSaltSync(10);
                usuario.senha = bcrypt.hashSync(usuario.senha, salt)

                const ret = await Database.ExecSQL("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)", [usuario.nome, usuario.email, usuario.senha]);

                usuario.id = ret.insertId;

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return usuario;
    }

    async Atualiza(id: number, usuario: Usuario) {
        if (id != usuario.id){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("UPDATE usuario SET nome = ? WHERE id = ?", [usuario.nome, usuario.id]);

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return usuario;
    }

    async AtualizaEmail(id: number, usuario: Usuario){
        if (id != usuario.id){
            throw new BadRequestError('Dados invalidos');
        }

        if (!usuario.hasOwnProperty('email')){
            throw new BadRequestError('Dado de e-mail invalido');
        }

        try {
            await Database.Open().then(async () => {

                const retValidaEmail = await Database.ExecSQL("SELECT email FROM usuario WHERE email = ?", [usuario.email]);
                if(retValidaEmail.length > 0){
                    throw new BadRequestError("O e-mail informado, já está em uso!");
                }

                await Database.ExecSQL("UPDATE usuario SET email = ? WHERE id = ?", [usuario.email, usuario.id]);
            });
        }
        catch(err) {
            throw err;
        }finally {
            await Database.Close();
        }

        return usuario;
    }

    async BuscaTodos() {
        let usuarios: Usuario[] = [];

        try {
            await Database.Open().then(async () => {
                usuarios = await Database.ExecSQL("SELECT * FROM usuario");
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return usuarios;
    }

    async BuscaPorId(id: number) {
        let usuario: Usuario;

        try {
            await Database.Open().then(async () => {
                const ret = await Database.ExecSQL("SELECT * FROM usuario WHERE id = ?", [id]);

                const res = ret.map((usuario: any) => usuario);
                if (res.length == 0){
                    throw new NotFoundError();
                }

                usuario = res[0];
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return usuario;
    }

    async BuscaPorEmail(email: string) {
        let usuario: Usuario;

        try {
            await Database.Open().then(async () => {
                const ret = await Database.ExecSQL("SELECT * FROM usuario WHERE email = ?", [email]);
                usuario = ret[0];
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return usuario;
    }
}

export default new UsuarioService();
