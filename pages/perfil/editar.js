import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import HeaderComAcoes from "../../components/headerComAcoes";
import UploadImagem from "../../components/uploadImagem";
import comAutorizacao from "../../hoc/comAutorizacao";
import imgAvatarPadrao from '../../public/imagens/avatar.svg'; 
import imgLimpar from '../../public/imagens/limpar.svg';
import Image from "next/image";
import UsuarioService from "../../services/UsuarioServices";
import { validarNome } from "@/utils/validadores";

const usuarioService = new UsuarioService();


 function EditarPerfil({usuarioLogado}){
  const router = useRouter();
   const [avatar, setAvatar] = useState();
   const [nome, setNome] = useState('');
   const [inputAvatar,setInputAvatar] = useState();
  

  //busca a imagem do avatar no perfil
  useEffect(() =>{
        if(!usuarioLogado){
          return;         
        }
        setNome(usuarioLogado.nome);
        setAvatar({
            preview: usuarioLogado.avatar      
        });
  },[]);
  //requisição para API e atualizar o localStorage
  const atualizarPerfil = async () => {
    try {
      if(!validarNome(nome)) {
          alert('Nome precisa de pelo menos 2 caracteres!');
       }

      const corpoRequisicao = new FormData();
      corpoRequisicao.append('nome', nome);

      if(avatar.arquivo) {
          corpoRequisicao.append('file', avatar.arquivo);
          console.log(corpoRequisicao);
      }

      await usuarioService.atualizarPerfil(corpoRequisicao);
      localStorage.setItem('nome', nome);

      if(avatar.arquivo) {
          localStorage.setItem('avatar', avatar.preview);
      }

      router.push('/perfil/eu');
  } catch (e) {
      alert( e + 'Erro ao editar perfil!');
  }
}




   const aoCancelarEdicao = () => {
       router.push('/perfil/eu');
   }
    const abrirSeletorDeArquivos = () => {
      inputAvatar?.click();
    }




   return(
        <div className="paginaEditarPerfil largura30pctDesktop">
          <div className="conteudoPaginaEditarPerfil">
             <HeaderComAcoes
               titulo={'Editar Perfil'}
               aoClicarAcaoEsquerda={aoCancelarEdicao}
               textoEsquerda='Cancelar'
               elementoDireita={'Concluir'}
               aoClicarElementoDireita={atualizarPerfil}             
             />
              <hr className='linhaDivisoria' />

                <div className='edicaoAvatar'>
                  <UploadImagem
                          setImagem={setAvatar}
                          imagemPreview={avatar?.preview || imgAvatarPadrao.src}
                          imagemPreviewClassName='avatar'
                          aoSetarAReferencia={setInputAvatar}
                      />
                  <span onClick={abrirSeletorDeArquivos}>Alterar foto do Perfil</span>
                </div>

                <hr className='linhaDivisoria' />

                <div className='edicaoNome'>
                    <label>Nome</label>
                    <input
                       type='text'
                       value={nome}
                       onChange={e => setNome(e.target.value)}
                    />                         
                    <Image
                      src={imgLimpar}
                      alt="icone limpar"
                      width={16}
                      height={16}
                      onClick={() => setNome('')}                
                     />             
                </div>
                <hr className='linhaDivisoria' />


          </div>
        </div>
   );
}

export default comAutorizacao(EditarPerfil);