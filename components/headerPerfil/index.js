
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import HeaderComAcoes from '../../components/headerComAcoes';
import Avatar from '../../components/avatar';
import Buttom from '../../components/buttom';
import { useEffect, useState } from 'react';
import UsuarioService from '../../services/UsuarioServices';


const usuarioService = new UsuarioService();


export default function HeaderPerfil ({
    usuario
}){
    const[estaSeguindoOUsuario,setEstaSeguindoOUsuario] = useState(false);

      useEffect(() => {
          if(!usuario){
              return;
          }
       setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
         

      },[usuario]);

      const obterTextoBotaoSeguir = () =>{
         console.log({estaSeguindoOUsuario})
         if(estaSeguindoOUsuario) {
             return 'Deixar de seguir';
         }
         return 'Seguir'
      }

      const obterCorDoBotaoSeguir = () => {
          if(estaSeguindoOUsuario){
             return 'outline';
          }
          return 'primary'
      }

      const manipularCliqueBotaoSeguir = async () => {
         try {
             await usuarioService.alternarSeguir(usuario._id);
             setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
         } catch (error) {
             alert('Erro ao seguir / deixar de seguir')
         }        
      }

  return(
        <div className='headerPerfil largura30pctDesktop'>
            <HeaderComAcoes
            iconeEsquerda={imgSetaEsquerda}
            titulo={usuario.nome}
            />
            <hr className='bordaHeaderPerfil'/>
            <div className='statusPerfil'>
               <Avatar src={usuario.avatar}/>            
               <div className='informacoesPerfil'>
                  <div className='statusContainer'>   
                      <div className='status'>
                         <strong>{usuario.publicacoes}</strong>
                         <span>Publicações</span>
                      </div>
                      <div className='status'>
                         <strong>{usuario.seguidores}</strong>
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
                    manipularClique={manipularCliqueBotaoSeguir}                           
                  />
               </div>
            </div>
       </div>
  )
}