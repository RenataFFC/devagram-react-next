
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import imgLogout from '../../public/imagens/logout.svg';
import HeaderComAcoes from '../../components/headerComAcoes';
import Avatar from '../../components/avatar';
import Buttom from '../../components/buttom';
import UsuarioService from '../../services/UsuarioServices';




const usuarioService = new UsuarioService();

export default function HeaderPerfil ({
        usuario,
        estaNoPerfilPessoal
        
}){
    const[estaSeguindoOUsuario,setEstaSeguindoOUsuario] = useState(false);
    const[qtdeSeguidores, setQtdeSeguidores] = useState(0);
    
    
     const router = useRouter();

         useEffect(() => {
          if(!usuario){
              return;              
          }
      setEstaSeguindoOUsuario(usuario.segueEsseUsuario); 
      setQtdeSeguidores(usuario.seguidores);    
      },[usuario]);

      const obterTextoBotaoSeguir = () =>{
          if(estaNoPerfilPessoal){
             return 'Editar Perfil'
          }

          if(estaSeguindoOUsuario) {
             return 'Deixar de seguir';
         }else{
         return 'Seguir'
      };
   };

      const obterCorDoBotaoSeguir = () => {
          if(estaSeguindoOUsuario){
             return 'outline';
          }else{
          return 'primary';
      };
   };

      const manipularCliqueBotaoPrincipal = async () => {

         if(estaNoPerfilPessoal){
            return router.push('/perfil/editar');//usamos o return para parar aqui
         }

         try {
   
             await usuarioService.alternarSeguir(usuario._id);
              setQtdeSeguidores(
               estaSeguindoOUsuario
                 ? (qtdeSeguidores -1)
                 : (qtdeSeguidores +1)
             );
             setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
         } catch (error) {
             alert('Erro ao seguir / deixar de seguir')
         }        
      }
      const aoClicarSetaEsquerda = () => {
         router.back() //permite que o usuario volta a uma determinada página(anterior)
      }

      const logout = () => {
         usuarioService.logout();
         router.replace('/');
      }

      const obterElementoDireitaHeader = () =>{
         if(estaNoPerfilPessoal){
           return(           
                  <Image
                  src={imgLogout}
                  alt='icone logout'
                  onClick={logout}
                  width={25}
                  height={25}          
                  />   
              
          );
      }
      return null;
   }

  return(
        <div className='headerPerfil largura30pctDesktop'>  

            <HeaderComAcoes
            iconeEsquerda={estaNoPerfilPessoal? null:imgSetaEsquerda}
            aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
            titulo={usuario.nome}
            elementoDireita={obterElementoDireitaHeader()}            
            />

            <hr className='linhaDivisoria'/>

            <div className='statusPerfil'>
               <Avatar src={usuario.avatar}/>            
               <div className='informacoesPerfil'>
                  <div className='statusContainer'>   
                      <div className='status'>
                         <strong>{usuario.publicacoes}</strong>
                         <span>Publicações</span>
                      </div>
                      <div className='status'>
                         <strong>{qtdeSeguidores}</strong>
                         <span>Seguidores</span>
                      </div>
                      <div className='status'>
                         <strong>{usuario.seguindo}</strong>
                         <span>Seguindo</span>
                      </div>
                  </div>

                  <Buttom
                    texto={obterTextoBotaoSeguir()}  
                    cor={obterCorDoBotaoSeguir()}    
                    manipularClique={manipularCliqueBotaoPrincipal}                           
                  />
               </div>
            </div>
       </div>
  )
}