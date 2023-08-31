
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import HeaderComAcoes from '../../components/headerComAcoes';
import Avatar from '../../components/avatar';
import Buttom from '../../components/buttom';


export default function HeaderPerfil ({
    usuario
}){
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
                         <strong>15</strong>
                         <span>Publicações</span>
                      </div>
                      <div className='status'>
                         <strong>120</strong>
                         <span>Seguidores</span>
                      </div>
                      <div className='status'>
                         <strong>135</strong>
                         <span>Seguindo</span>
                      </div>
                  </div>

                  <Buttom
                    texto={'Seguir'}                   
                  />
               </div>
            </div>
       </div>
  )
}