import {useEffect, useRef} from 'react';

export default function UploadImagem({
    className ='',
    setImagem,
    imagemPreview,
    imagemPreviewClassName= '',
    aoSetarAReferencia
}){
    const referenciaInput = useRef(null);
    useEffect(() => {
        
    if(!aoSetarAReferencia){
        return;
     } 
       aoSetarAReferencia(referenciaInput?.current);
    },[referenciaInput?.current]);
    
    const abrirSeletorArquivos = () => {
       referenciaInput?.current?.click();
    }

    const aoAlterarImagem = () => {
        if(!referenciaInput?.current?.files?.length){
            return;
        }

        //fileReader = 
        const arquivo = referenciaInput?.current?.files[0];
         //fileReader = classe do JavaScript
        const fileReader=new FileReader();
        //readAsDataUR metodo que devolve a url de um arquivo
        fileReader.readAsDataURL(arquivo);
        //onloadend = saber se o arquivo já foi carregado
        fileReader.onloadend = () =>{
            setImagem({
                preview: fileReader.result,
                arquivo
            });

        }
 
    }
    return(
        <div className={`uploadImagemContainer ${className}`}
         onClick={abrirSeletorArquivos}>
              {imagemPreview && (
                <div className='imagemPreviewContainer'>
                    <img
                    src={imagemPreview}
                    alt='imagem preview'
                    className={imagemPreviewClassName}  
                    />                 
                </div>
            ) }
            <input 
            type='file' 
            className='oculto' 
            accept="image/*"
            ref={referenciaInput}
            onChange={aoAlterarImagem}
            />
        </div>
    );  

}