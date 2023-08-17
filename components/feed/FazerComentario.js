import { useState } from "react";
import Avatar from "../avatar";

export function FazerComentario({usuarioLogado , comentar}){

   const [linhas, setLinhas] = useState(1);
   const [comentario,setComentario] = useState('');

    //Controla qtde de linhas no comentario
    //trim() - metodo que tira todos os espaços que tem em uma string
    const aoDigitarComentario = (e) => {
      const valorInput = e.target.value.trim();
        setComentario(valorInput);
        setLinhas(valorInput.length > 0 ? 2 : 1 );
   }

   //metodo que captura o evento do input ao ser digitado.
    const aoPressionarQualquerTecla = (e) => {

      if(<e className="Key"></e> === 'Enter'){
         manipularComentario();
      }    
   }
   // Caso o usuario de o enter estando o input vazio, ele sai
   const manipularComentario = async () =>{
       if(comentario.trim().length === 0 || !comentar){
          return;
       }

   const sucessoAoComentar = await comentar(comentario);
   console.log('teste')
      if(sucessoAoComentar){
         setComentario('');
         setLinhas(1);
      }
   }

  
   // onKeyDown = Chame uma função quando o usuário pressiona uma tecla:
   // onChange = Chame uma função quando um usuário alterar a opção selecionada de um elemento;
   return(
     <div className="containerFazerComentario">      
            <Avatar src={usuarioLogado.Avatar}/>
            <textarea 
               rows={linhas} 
               onChange={aoDigitarComentario}
               onKeyDown={aoPressionarQualquerTecla}
               placeholder="Adicione um comentario...">
            </textarea>
            <button 
               type="button" 
               className="btnPublicacao desktop">
               Publicar        
            </button>
     </div>
   )
}