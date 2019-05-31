import { VagasCompetencia } from "./vaga-competencia";

export class Relaciona {
    constructor(
        public codigoEmpresa : number,
        public  nomeEmpresa: string ,
        public  codigoVaga: number ,
        public  descricaoVaga: string ,
        public  competenciaRelacionadas: number,
        public competencias: VagasCompetencia[] 
    ){}
}