import Image from 'next/image';
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from '../layout/Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';
import { useState } from 'react';


export default function Header(){
	const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
  const [termoPesquisado, setTermoPesquisado] = useState([]);
	const aoPesquisar = (e) => {		
		setTermoPesquisado(e.target.value);
		setResultadoPesquisa([]);
		if(termoPesquisado.length < 3){
			return;
 }

 setResultadoPesquisa([
	{
	avatar: '',
	nome:'Johny',
	email:'johny@johny.com',
	_id:'12345'
},
{
	avatar: '',
	nome:'renata',
	email:'renatactba@renatactba.com',
	_id:'12345'
},
{
	avatar: '',
	nome:'Joao',
	email:'joao@hotmail.com',
	_id:'12345'
}
]);
	}

   

	const aoClicarResultadoPesquisa = (id) => {
		 console.log('aoClicarResultadoPesquisa', {id})
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