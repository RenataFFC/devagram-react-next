import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
  async login(credenciais) {
    const { data } = await this.post("/login", credenciais);

    localStorage.setItem("nome", data.nome);
    localStorage.setItem("email", data.email);
    localStorage.setItem("token", data.token);

    //setItem - metodo usado para armanezar informação

    const usuario = await this.get("/usuario");
    localStorage.setItem('id', usuario.data._id);

    if (usuario.data.avatar) {
      localStorage.setItem("avatar", usuario.data.avatar);
      
    }
  }
  //criando um método cadastro
  async cadastro(dados) {
    return this.post("/cadastro", dados);
  }
  estaAutenticado(){
    return localStorage.getItem('token') !== null;
  }
  //criando um método para pesquisar
  async pesquisar(termoDaPesquisa) {
    return this.get('/pesquisa?filtro='+ termoDaPesquisa);
  }

  obterInformacoesDoUsuarioLogado(){
    return{
       id: localStorage.getItem('id'),
       nome: localStorage.getItem('nome'),
       email: localStorage.getItem('email'),
       avatar: localStorage.getItem('avatar')
    }
  }
 

}
