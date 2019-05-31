
import Database from '../../data/database';
import { Competencia } from '../../types/models/competencia';
import { BadRequestError, NotFoundError } from '../../api/responses/errors';

class CompetenciaService {

    async Insere(comp: Competencia) {
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                const ret = await Database.ExecSQL("INSERT INTO competencia (descricao) VALUES (?)", [comp.descricao]);

                comp.id = ret.insertId;

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return comp;
    }

    async Atualiza(id: number, comp: Competencia) {
        if (id != comp.id){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("UPDATE competencia SET descricao = ? WHERE id = ?", [comp.descricao, comp.id]);

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return comp;
    }



    async BuscaTodos() {
        let comp: Competencia[] = [];

        try {
            await Database.Open().then(async () => {
                comp = await Database.ExecSQL("SELECT * FROM competencia");
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return comp;
    }

    async BuscaPorId(id: number) {
        let comp: Competencia;

        try {
            await Database.Open().then(async () => {
                const ret = await Database.ExecSQL("SELECT * FROM competencia WHERE id = ?", [id]);

                const res = ret.map((comp: any) => comp);
                if (res.length == 0){
                    throw new NotFoundError();
                }

               comp= res[0];
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return comp;
    }

}

export default new CompetenciaService();
