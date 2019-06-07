
import Database from '../../data/database';
import { PossuiAlunoComp } from '../../types/models/possui.aluno.vaga';
import { BadRequestError } from '../../api/responses/errors';

class PossuiAlunoCompService {

    async Insere(dados: PossuiAlunoComp) {
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                const ret = await Database.ExecSQL("INSERT INTO possui_comp_aluno (id_aluno, id_comp, nivel) VALUES (?,?,?)", [dados.id_aluno, dados.id_comp, dados.nivel]);

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

    async Atualiza(id: number, dados: PossuiAlunoComp) {
        console.log (id)
        console.log (dados.id_aluno)
        if (id != dados.id_aluno){
            throw new BadRequestError();
        }

        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("UPDATE possui_comp_aluno SET nivel = ? WHERE id_comp = ? AND id_aluno = ? ", [dados.nivel, dados.id_comp, dados.id_aluno]);

                await Database.CommitTran();
            });
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return dados;
    }

    async Remove( dados: PossuiAlunoComp) {
        
        try {
            await Database.Open().then(async () => {
                await Database.BeginTran();

                await Database.ExecSQL("DELETE FROM possui_comp_aluno WHERE nivel = ? AND id_comp = ? AND id_aluno = ? ", [dados.nivel, dados.id_comp, dados.id_aluno]);

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
        let dados: PossuiAlunoComp[]= [];

        try {
            await Database.Open().then(async () => {
                dados = await Database.ExecSQL("select  pca.id_aluno as codigoAluno, a.nome as nomeAluno ,pca.id_comp as id_comp, c.descricao as descricaoCompetencia, pca.nivel as nivel from competencia as c inner join possui_comp_aluno as pca on c.id = pca.id_comp inner join aluno as a on a.id = pca.id_aluno where pca.id_aluno = ?"
                , [id_al]);
            });
            
        } catch (err) {
            throw err;
        } finally {
            await Database.Close();
        }

        return dados;
    }

    async BuscaCompAluno(id_al: number) {
        let dados: PossuiAlunoComp[]= [];

        try {
            await Database.Open().then(async () => {
                dados = await Database.ExecSQL("SELECT v.id as codigoVaga, c.descricao as descricaoCompetencia, pcv.nivel as nivelPossuiCompetenciaVaga FROM possui_comp_vagas AS pcv INNER JOIN vagas AS v ON v.id = pcv.id_vaga INNER JOIN competencia AS c ON c.id = pcv.id_comp INNER JOIN empresa AS e ON e.id = v.id_empre INNER JOIN possui_comp_aluno AS pca ON pca.id_comp = pcv.id_comp AND pca.nivel = pcv.nivel INNER JOIN aluno AS a	ON a.id = pca.id_aluno WHERE a.id = ?"
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

export default new PossuiAlunoCompService();
