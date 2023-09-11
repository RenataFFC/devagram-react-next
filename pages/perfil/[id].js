import Feed from '../../components/feed';
import comAutorizacao from '../../hoc/comAutorizacao';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderPerfil from '../../components/headerPerfil';
import UsuarioService from '../../services/UsuarioServices';


const usuarioService = new UsuarioService()

function Perfil({usuarioLogado}){
  const [usuario, setUsuario] = useState({});
  const router = useRouter();

  const obterPerfil = async (idUsuario) => {
    try{
       const {data} = await usuarioService.obterPerfil(
         estaNoPerfilPessoal()
          ? usuarioLogado.id 
          : idUsuario

       ); //aqui estamos pegando o response que é data que trás o corpo da resposta
       return data;    
          
   } catch (error){
      alert ('Erro ao obter o perfil do usuário')
   }
}  
 const estaNoPerfilPessoal = () =>{
   return router.query.id === 'eu';
 }
  useEffect(() => {
    if(!router.query.id) {     
      return;
    }    
      const PegarDadosPerfil = async() => {
      const dadosPerfil = await obterPerfil(router.query.id);//aguardar o perfil passando a rota 
       setUsuario(dadosPerfil);       
       }     
      PegarDadosPerfil();    
},[router.query.id]);
  
  return(
        <div className='paginaPerfil'>  
          <HeaderPerfil 
            usuarioLogado={usuarioLogado}
            usuario={usuario}
            estaNoPerfilPessoal={estaNoPerfilPessoal()}
          />
          <Feed
           usuarioLogado={usuarioLogado}
           usuarioPerfil={usuario}
           />
        </div>
  );  
}
export default comAutorizacao(Perfil);