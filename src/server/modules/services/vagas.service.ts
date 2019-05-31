
import Database from '../../data/database';
import { Vagas } from '../../types/models/vagas';
import { BadRequestError, NotFoundError } from '../../api/responses/errors';

class VagasService {

    async Insere(vagas: Vagas) {
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                const ret = await Database.ExecSQL("INSERT INTO vagas (descricao, id_empre) VALUES (?, ?)", [vagas.descricao, vagas.id_empresa]);

                vagas.id = ret.insertId;

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return vagas;
    }

    async Atualiza(id: number, vagas: Vagas) {
        if (id != vagas.id){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("UPDATE vagas SET descricao = ? WHERE id = ?", [vagas.descricao, vagas.id]);

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return vagas;
    }



    async BuscaTodos() {
        let vagas: Vagas[] = [];

        try {
            await Database.Open().then(async () => {
                vagas = await Database.ExecSQL("SELECT * FROM vagas");
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return vagas;
    }

    async BuscaPorId(id: number) {
        let vagas: Vagas;

        try {
            await Database.Open().then(async () => {
                const ret = await Database.ExecSQL("SELECT * FROM vagas WHERE id = ?", [id]);

                const res = ret.map((vagas: any) => vagas);
                if (res.length == 0){
                    throw new NotFoundError();
                }

                vagas = res[0];
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return vagas;
    }

}

export default new VagasService();
