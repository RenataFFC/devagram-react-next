import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import { useState } from "react";


import imgCurtir from "../../public/imagens/curtir.svg";
import imgCurtido from "../../public/imagens/curtido.svg";
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg";
import {FazerComentario} from '../../components/feed/FazerComentario';
import FeedService from "../../services/FeedService";


const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem({
    id,
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado,
    curtidas
}){
  const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas);
  const [comentariosPostagem,setComentariosPostagem] = useState(comentarios);
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
    return mensagem;
    }  

    // o icone do comentario ficara lilás ao ser clicado
    const obterImagemComentario = () =>{
    return deveExibirSecaoParaComentar 
    ? imgComentarioAtivo 
    : imgComentarioCinza;
    }

 
    
    //Lógica para a chamada da API
    // try catch para avaliar se terá um comportamento inexperado da aplicação
    //Pegar o payload do comentario e passar como parametro junto com o id e ele dara o resultado

    const comentar = async (comentario) => {
       console.log('fazer comentario');
       
      try {
         // chama o comentario
         await feedService.adicionarComentario(id, comentario);
         //após comentar será oculto o elemento
         setDeveExibirSecaoParaComentar(false);    
         setComentariosPostagem([
          ...comentariosPostagem,
          {
             nome: usuarioLogado.nome,
             mensagem: comentario
          }
         ]);              
      } catch (e) {
        alert('Erro ao fazer comentario' + (e?.response?.data?.erro ||'')); // Exibi o erro da API caso tenha alguma mensagem de erro customizado ou devolva uma string vazia
      } 
    }

    const usuarioLogadoCurtiuPostagem = () => {
       return curtidasPostagem.includes(usuarioLogado.id);
    }
       
    const alterarCurtida = async () => {
       try {
           await feedService.alterarCurtida(id);
           const estaCurtido = curtidasPostagem.includes(usuarioLogado.id);
           if(usuarioLogadoCurtiuPostagem()){
            //Se o usuario logado curtiu a postagem tiro o usuario da lista de curtidas
             setCurtidasPostagem(
               curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)  //filter - filtrar somente os subitems da lista que combinam com o filtro
             )}
             else{
              //adiciona o usuario logado na lista de curtidas
               setCurtidasPostagem([
                  ...curtidasPostagem,
                  usuarioLogado.id
               ]);
             }           
            //includes() determina se um array/objeto contém um determinado elemento ou não, retornando true ou false
       } catch (e) {
        alert('Erro ao alterar a curtida' + (e?.response?.data?.erro ||''))
       }
    }

    const obterImagemCurtida = () =>{
          return usuarioLogadoCurtiuPostagem()
          ?imgCurtido
          :imgCurtir;
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
                className="span"
                src={obterImagemCurtida()}
                alt="icone curtir"
                width={20}
                height={20}
                onClick={alterarCurtida}
                />  

                <Image 
                className="span"
                src={obterImagemComentario()}
                alt="icone comentar"
                width={20}
                height={20}
                onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                />  

                <span className="quantidadeCurtidas">
                   Curtida por <strong> {curtidasPostagem.length} pessoas </strong>
                </span>
            </div>

            <div className="descricaoDaPostagem">
                <strong className="nomeUsuario">{usuario.nome} </strong>
                <p className="descricao">
                  {obterDescricao()}
                  {descricaoMaiorQueLimite() && (
                    <span 
                      onClick={exibirDescricaoCompleta}
                      className="exibirDescricaoCompleta"> 
                      mais
                    </span>
                  ) }
                  </p>
            </div>          

            <div className="comentariosDaPublicacao">
              {comentariosPostagem.map((comentario,i) => (
                <div className="comentario" key={i}>
                  <strong className="nomeUsuario">{comentario.nome}</strong>
                  <p className="descricao">{comentario.mensagem}</p>
                </div>              
              ))}
           </div>             
        </div>
        
        {deveExibirSecaoParaComentar && (<FazerComentario comentar={comentar} usuarioLogado={usuarioLogado}/>)
           
        }    
    </div>
    );
  }
    
