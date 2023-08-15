import { useEffect, useState } from "react";
import Postagem from '../feed/Postagem';
import FeedService from '../../services/FeedService';

const feedService = new FeedService();

export default function Feed({usuarioLogado}){
   const[listaDePostagens, setListaDePostagens] = useState([]);

   useEffect(async() =>  {
    const {data} = await feedService.carregarPostagens();
    setListaDePostagens([]);
   
    const postagensFormatadas = data.map((postagem) => (
      { 
        id: postagem._id,
        usuario:{
           id: postagem.userId,
           nome:postagem.usuario.nome,
           avatar:postagem.usuario.avatar 
        },
         fotoDoPost: postagem.foto,
         descricao: postagem.descricao,
         curtidas: postagem.likes,
         comentarios: postagem.comentarios.map(c => ({
         nome: c.nome,
         mensagem: c.comentario
         })) 
        }
    ));

    setListaDePostagens(postagensFormatadas);

   
   },[usuarioLogado]);
   
   return(
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map(dadosPostagem =>(
         <Postagem 
           Key={dadosPostagem.id}
           {...dadosPostagem}
           usuarioLogado={usuarioLogado}
          />
      ))}  
    </div>   
   )
}