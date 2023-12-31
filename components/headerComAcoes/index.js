import Image from 'next/image';

export default function HeaderComAcoes({
   className,
   iconeEsquerda,
   textoEsquerda = null,
   aoClicarAcaoEsquerda,
   titulo,
   elementoDireita,
   aoClicarElementoDireita
}){
  return(
    <div className={`headerComAcoes ${className}`}>
    {iconeEsquerda ? (
        <Image
            src={iconeEsquerda}
            alt='icone esquerda cabeçalho com ações'
            onClick={aoClicarAcaoEsquerda}
            width={25}
            height={25}
        />
    ) : (
         textoEsquerda !== null && (
          <span className="headerComAcoesTextoEsquerda" onClick={aoClicarAcaoEsquerda}>
            {textoEsquerda}
          </span>
         )
      )}  
      <h3>{titulo}</h3>

      {elementoDireita && (
                <button
                    type='button'
                    className='btnAcaoDireita'
                    onClick={aoClicarElementoDireita}
                >
                    {elementoDireita}
                </button>
      )}     
    </div>
  )
}