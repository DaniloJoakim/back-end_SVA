import Database from '../../data/database';
import { Relaciona } from '../../types/models/rel-aluno-vaga';
import {  NotFoundError } from '../../api/responses/errors';
//import { VagasCompetencia } from '../../types/models/vaga-competencia';

class RelacionaService {
    async BuscaPorId(id: number) {
            let relaciona: Relaciona[] = [];
            let i: number = 0;
            let a: number = 0;

            try {
                await Database.Open().then(async () => {
                    const retVaga = await Database.ExecSQL("SELECT c.codigoEmpresa, c.nomeEmpresa, c.codigoVaga, c.descricaoVaga, count(*) AS competenciaRelacionadas   from (SELECT e.id as codigoEmpresa, e.nome as nomeEmpresa ,v.id as codigoVaga, v.descricao as descricaoVaga ,c.descricao as descricaoCompetencia, pcv.nivel as nivelPossuiCompetenciaVaga, a.nome as nomeAluno, pca.nivel as nivelPossuiCompetenciaAluno FROM possui_comp_vagas AS pcv INNER JOIN vagas AS v ON v.id = pcv.id_vaga INNER JOIN competencia AS c ON c.id = pcv.id_comp INNER JOIN empresa AS e ON e.id = v.id_empre INNER JOIN possui_comp_aluno AS pca ON pca.id_comp = pcv.id_comp AND pca.nivel = pcv.nivel INNER JOIN aluno AS a	ON a.id = pca.id_aluno WHERE a.id = ?) as c  group by c.nomeEmpresa,  c.codigoVaga order by competenciaRelacionadas desc"
                    , [id]);
                     
                    const arrayVagas = retVaga.map((relaciona: any) =>relaciona);

                      a = parseInt(arrayVagas.length)
                      
                            while (a != i) {
                               
                             const retCompetencia = await Database.ExecSQL("SELECT pcv.id_vaga as codigodaVaga, c.descricao as descricaoCompetencia, pcv.nivel as nivelPossuiCompetenciaVaga FROM possui_comp_vagas AS pcv INNER JOIN vagas AS v ON v.id = pcv.id_vaga INNER JOIN competencia AS c ON c.id = pcv.id_comp INNER JOIN empresa AS e ON e.id = v.id_empre INNER JOIN possui_comp_aluno AS pca ON pca.id_comp = pcv.id_comp AND pca.nivel = pcv.nivel INNER JOIN aluno AS a ON a.id = pca.id_aluno WHERE pca.id_aluno = ? and e.id = ?"
                             ,[id, retVaga[i]["codigoEmpresa"]]);
                               
                             arrayVagas[i].competencias = []
                              console.log(arrayVagas[i])
                              arrayVagas[i].competencias.push(retCompetencia.map((vagaCompetencia: any) =>vagaCompetencia))
                            
                                    i++;
                            }
                            

                                if (arrayVagas.length == 0){
                                     throw new NotFoundError();
                                    }
                    
                                    relaciona = arrayVagas;
                });
            } catch (err) {
                throw err;
            } finally {
                await Database.Close();
            }
    
            return relaciona;
            
        }
    
    }
    
    export default new RelacionaService();