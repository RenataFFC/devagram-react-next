import Image from 'next/image';

export default function HeaderComAcoes({
   className,
   iconeEsquerda,
   textoEsquerda = null,
   aoClicarAcaoEsquerda,
   titulo
}){
  return(
    <div className={`headerComAcoes ${className}`}>
      {iconeEsquerda ?(
        <Image
           src={iconeEsquerda}
           alt='icone esquerda header com ações'
           onClick={aoClicarAcaoEsquerda}
           width={20}
           height={20}
        />
       
      ):(
         textoEsquerda !== null && (
          <span className='headerComAcoesTextoEsquerda' onClick={aoClicarAcaoEsquerda}>
            {textoEsquerda}
          </span>
         )
      )}  
      <h3>{titulo}</h3>
 </div>
  )
}