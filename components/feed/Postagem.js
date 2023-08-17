import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import { useState } from "react";

import imgCurtir from "../../public/imagens/curtir.svg";
//import imgCurtido from "../../public/imagens/curtido.svg";
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg";
import {FazerComentario} from '../../components/feed/FazerComentario';


const tamanhoLimiteDescricao = 90;

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}){

  const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false)
  const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(tamanhoLimiteDescricao);

  const exibirDescricaoCompleta = () => {
      setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
  }

  const descricaoMaiorQueLimite = () => {
     return descricao.length > tamanhoAtualDaDescricao;
  }

  const obterDescricao = () => {
    let mensagem = descricao.substring(0 , tamanhoAtualDaDescricao);
    if(descricaoMaiorQueLimite()){
       mensagem += '...';
    }
    return mensagem
    }  

    // o icone do comentario ficara lilás ao ser clicado
    const obterImagemComentario = () =>{
    return deveExibirSecaoParaComentar 
    ?imgComentarioAtivo 
    :imgComentarioCinza;
    }
    
    //Fazer a chamada para a API

    const comentar = async (comentario) => {
       console.log('fazer comentario');
       return true;
    }

  return(
    <div className="postagem">
        <Link href={`/perfil/${usuario.id}`}>
            <section className="headerPostagem">
              <Avatar src={usuario.avatar}/>
              <strong>{usuario.nome}</strong>
            </section>           
        </Link>    

        <div className="fotoDaPostagem">
            <img src={fotoDoPost} alt='foto da postagem'/>
        </div>

       <div className="footerDaPostagem">
            <div className="acoesDaPostagem">
                <Image 
                src={imgCurtir}
                alt="icone curtir"
                width={20}
                height={20}
                onClick={() => console.log('curtir')}
                />  

                <Image 
                src={obterImagemComentario()}
                alt="icone comentar"
                width={20}
                height={20}
                onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                />  

                <span className="quantidadeCurtidas">
                   Curtida por <strong> 32 pessoas </strong>
                </span>
            </div>

            <div className="descricaoDaPostagem">
                <strong className="nomeUsuario">{usuario.nome} </strong>
                <p className="descricao">
                  {obterDescricao()}
                  { descricaoMaiorQueLimite() && (
                    <span 
                      onClick={exibirDescricaoCompleta}
                      className="exibirDescricaoCompleta"> 
                      mais
                    </span>
                  ) }
                  </p>
            </div>          

            <div className="comentariosDaPublicacao">
              {comentarios.map((comentario,i) => (
                <div className="comentario" key={i}>
                  <strong className="nomeUsuario">{comentario.nome}</strong>
                  <p className="descricao">{comentario.mensagem}</p>
                </div>              
              ))}
           </div>             
        </div>
        
        {deveExibirSecaoParaComentar &&
            <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado}/>
        }    
    </div>
    );
  }
    
