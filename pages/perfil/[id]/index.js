import Feed from '../../../components/feed';
import comAutorizacao from '../../../hoc/comAutorizacao';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HeaderPerfil from '../../../components/headerPerfil';
import UsuarioService from '../../../services/UsuarioServices';


const usuarioService = new UsuarioService()

function Perfil({usuarioLogado}){
  const [usuario, setUsuario] = useState({});
  const router =useRouter();

  const obterPerfil = async (idUsuario) =>{
   try{
        const {data} = await usuarioService.obterPerfil(idUsuario); //aqui estamos pegando o response que é data que trás o corpo da resposta
         return data;
   } catch (error){
      alert ('Erro ao obter o perfil do usuário')
   }
}  

  useEffect(() => {
    if (!router.query.id) {
      return;
    }    
      const PegarDadosPerfil = async() => {
      const dadosPerfil = await obterPerfil(router.query.id);//aguardar o perfil passando a rota 
       setUsuario({ nome:'Renata'});       
       }
       console.log('dadosPerfil')
       
      PegarDadosPerfil();    
},[router.query.id]);
  
  return(
        <div className='paginaPerfil'>  
          <HeaderPerfil 
            usuarioLogado={usuarioLogado}
            usuario={usuario}
          />
          <Feed usuarioLogado={usuarioLogado}/>
        </div>
  );  
}
export default comAutorizacao(Perfil);