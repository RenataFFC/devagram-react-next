import { useEffect, useState } from "react";
import Postagem from '../feed/Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export default function Feed({usuarioLogado}){
   const[listaDePostagens, setListaDePostagens] = useState([]);

   useEffect (() => {
    async function  fetchPostagens() {
            setListaDePostagens([]);
            const {data} = await feedService.carregarPostagens();   
                  const postagensFormatadas = data.map((postagem) =>({ 
                    id: postagem._id,
                    usuario:{
                      id: postagem.userId,
                      nome:postagem.usuario.nome,
                      avatar:postagem.usuario.avatar 
                    },
                    fotoDoPost: postagem.foto,
                    descricao: postagem.descricao,
                    curtidas: postagem.likes,
                    comentarios: postagem.comentario.map(c => ({
                      nome: c.nome,
                      mensagem: c.comentario
                    }))              
              })); 
              setListaDePostagens(postagensFormatadas);
              console.log(postagensFormatadas);
             
  }        
  fetchPostagens();
},[]);

      return(
        <div className="feedContainer largura30pctDesktop">
          {listaDePostagens.map(dadosPostagem =>(
            <Postagem 
              key={dadosPostagem.id}
              {...dadosPostagem}
              usuarioLogado={usuarioLogado}
              />
            ))}  
        </div>   
      )

 }
 
   
