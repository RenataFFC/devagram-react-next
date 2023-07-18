import HttpService from "./HttpService";

export default class UsuarioService extends HttpService{
   async login(credenciais){
       await this.post('/login', credenciais);        
   }

   async cadastro(dados){
         return this.post('/cadastro', dados);
   }

}