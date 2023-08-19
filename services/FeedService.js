import HttpService from "./HttpService";

export default class FeedService extends HttpService{
      async carregarPostagens(idUsuario) {
        let url = '/feed';
        if(idUsuario) {
            url += `?id=${idUsuario}`;
        }
        return this.get(url);
      } 
      // antes verificar no postman(back) o nome do metodo usado
    async adicionarComentario(idPostagem, comentario){
      return this.put(`/comentario?id=${idPostagem}`,{
           comentario
        });      
  }
 }

    

    
  
