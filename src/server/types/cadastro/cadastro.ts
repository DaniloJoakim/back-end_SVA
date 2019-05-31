import { Aluno } from "../models/aluno";
import { Empresa } from "../models/empresa"

export class Cadastro extends Aluno {
    constructor(
        public email: string,
        public senha: string
    ){
        super(null, null, null);
    }
}

export class CadastroEmp extends Empresa {
    constructor(
        public email: string,
        public senha: string
    ){ 
        super (null, null);
    }
}
