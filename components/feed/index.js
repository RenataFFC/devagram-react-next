import { useEffect, useState } from "react";
import Postagem from '../feed/Postagem';

export default function Feed({usuarioLogado}){
   const[listaDePostagens, setListaDePostagens] = useState([]);

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
        fotoDoPost:'https://img.elo7.com.br/product/zoom/338BB23/painel-de-festa-paisagem-natureza-3x2-festa-infantil.jpg',
        descricao:'Donate: If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay',
        curtidas:[],
        comentarios:[
            {
              nome:'Fulano',
              mensagem:'Muito Legal'
            }
        ]
      },  
      {
        id: '2',
        usuario:{
            id:'2',
            nome:'johny',
            avatar:null
        },
        fotoDoPost:'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
        descricao:'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32',
        curtidas:[],
        comentarios:[
            {
              nome:'Joao',
              mensagem:'Muito Legal'
            },
            {
              nome:'Renata',
              mensagem:'Show'
            },
            {
              nome:'Joohny',
              mensagem:'Legal'
            },
        ]
      },        
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