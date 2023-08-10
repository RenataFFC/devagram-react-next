import Image from 'next/image';
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from '../layout/Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';
import { useState } from 'react';
import UsuarioService from '../../services/UsuarioServices';
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function Header(){
	const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState('');
	const router = useRouter();

	const aoPesquisar = async (e) => {		
		setTermoPesquisado(e.target.value);
		setResultadoPesquisa([]);

		if(e.target.value.length < 3){
			return;
    }
				try {
					const { data } = await usuarioService.pesquisar(termoPesquisado);
					setResultadoPesquisa(data);
				} catch (error){
					alert('Erro ao pesquisar usuario' + error?.response?.data?.erro);
				}  
				}   

	const aoClicarResultadoPesquisa = (id) => {
		setResultadoPesquisa([]);
		setTermoPesquisado('');
		 router.push(`/perfil/${id}`);
	}
   return (
		<header className='headerPrincipal'>
			<div className="conteudoHeaderPrincipal">			
          <div className="logoHeaderPrincipal">  
					<Image
						src={logoHorizontalImg}
						alt='logo devagram'
						layout='fill' //permite redimensionar a imagem  baseado na div pai dela.
						/>
			     </div>

			  <div className="barraPesquisa">
						<div className='containerImagemLupa'>
						<Image
						src={imagemLupa}
						alt='Icone Lupa'
						layout='fill'
						/>					
				  </div>

					  <input
					    type='text'
							placeholder='Pesquisar'
							value={termoPesquisado}
							onChange={aoPesquisar}					 
					   />
			  </div>
				 <Navegacao className='desktop'/>
			</div>
			{resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
            )}
        </header>
    );
}