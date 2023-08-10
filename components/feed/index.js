import { useEffect, useState } from "react";

export function Feed({usuarioLogado}){
   const[listaDePostagens, setListaDePostagens] = useState();

   useEffect(() => {
    console.log('carregar o feed');
    setListaDePostagens([
      {
        id: '1',
     usuario:{
      id:'1',
      nome:'Renata',
      avatar:null
     },
     fotoDoPost:'',
     descricao:'',
     likes:[''],
     curtidas:[],
     comentario:[
      {
        nome: 'Fulano',
        mensagem: 'Muito Legal'
      }
     ]
      }
      
    ])
      
   },[usuarioLogado]);

   return(
    <div className="feedContainer">
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