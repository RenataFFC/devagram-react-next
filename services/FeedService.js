import DevagramApiService from "./DevagramApiService";

export default class FeedService extends DevagramApiService{
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
        
    async alterarCurtida(idPostagem){
       return this.put(`/like?id=${idPostagem}`);
    }    

    async fazerPublicacao(dadosPublicacao){
      return this.post('/publicacao', dadosPublicacao);
   }     
}
 

    

    
  
