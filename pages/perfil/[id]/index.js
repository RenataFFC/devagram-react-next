import HeaderComAcoes from '../../../components/headerComAcoes';
import Feed from '../../../components/feed';
import comAutorizacao from '../../../hoc/comAutorizacao';
import imgSetaEsquerda from '../../../public/imagens/setaEsquerda.svg'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function Perfil({usuarioLogado}){
  const [usuario, setUsuario] = useState({});
  const router =useRouter();
  
  useEffect(() => {

    async function obterPerfil(){
    const dadosPerfil = await obterPerfil();
    setUsuario({
      nome:'Renata'     
    });
    console.log('chegou')
    }
    obterPerfil();

},[router.query.id]);



  
  return(
        <div className='paginaPerfil'>
          <HeaderComAcoes
            iconeEsquerda={imgSetaEsquerda}
            titulo={usuario.nome}
          />
          <Feed usuarioLogado={usuarioLogado}/>
        </div>
  );  
}
export default comAutorizacao(Perfil);