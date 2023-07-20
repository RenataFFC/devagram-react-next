import logoHorizontalImg from '../../public/imagens/logoHorizontalImg.svg';
import Image from 'next/image';

export default function Header(){
   return (

		<header className='headerPrincipal'>
			<div className="conteudoHeaderPrincipal">
			
           <div className="logoHeaderPrincipal">  
				<Image
				 src={logoHorizontalImg.svg}
				 alt='logo devagram'
				 layout='fill' //permite redimensionar a imagem  baseado na div pai dela.
				/>
			  </div>

			</div>
		</header>

   );
}