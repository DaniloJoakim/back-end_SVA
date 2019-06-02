export class Aluno {
    constructor(
        public id: number,
        public nome: string,
        public idade: number,
        public sobrenome: string, 
        public datNasc: Date, 
        public estado: string,  
        public cidade: string,  
        public pais: string,  
        public telefone: string, 
        public celular: string, 
        public instituicao: string, 
        public curso: string,  
        public status: number, 
        public periodo: string, 
        public semestre: number, 
        public inicio: Date, 
        public termino: Date, 
        public conclusao: Date,
        public alunoEmail: Date
    ){}
}
