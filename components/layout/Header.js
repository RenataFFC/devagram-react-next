import Image from 'next/image';
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from '../layout/Navegacao';


export default function Header(){
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
							value={''}
							onChange={() => console.log('Pesquisando')}
					 
					 />
			  </div>
				 <Navegacao className='desktop'/>

			</div>
		</header>

   );
}