
import Database from '../../data/database';
import { PossuiVagaComp } from '../../types/models/possui.aluno.vaga';
//import { BadRequestError, NotFoundError } from '../../api/responses/errors';

class PossuiVagaCompService {

    async Insere(dados: PossuiVagaComp) {
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                const ret = await Database.ExecSQL("INSERT INTO possui_comp_vagas (id_vaga, id_comp, nivel) VALUES (?,?,?)", [dados.id_vaga, dados.id_comp, dados.nivel]);

              dados = ret;

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return dados;
    }

    async BuscaTodos(id_al: number) {
        let dados: PossuiVagaComp[]= [];

        try {
            await Database.Open().then(async () => {
                dados = await Database.ExecSQL("SELECT pcv.id_comp AS codigoCompetencia, c.descricao AS descricaoCompetencia, pcv.id_vaga AS codigoVaga, pcv.nivel as nivelCompetencia, v.descricao AS descricaoVaga FROM competencia AS c INNER JOIN possui_comp_vagas AS pcv ON c.id = pcv.id_comp INNER JOIN vagas AS v ON v.id = pcv.id_vaga WHERE pcv.id_vaga = ?"
                , [id_al]);
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return dados;
    }

   

   /* async Atualiza(id_al: number, id_com: PossuiAlunoComp) {
    if (id_al != dados.id){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("UPDATE possui_comp_aluno SET descricao = ? WHERE id = ?", [dados.descricao,dados.id]);

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return vagas;
    }*/

    

}

export default new PossuiVagaCompService();
