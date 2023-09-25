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
    };

    const aoAlterarImagem = () => {
        if(!referenciaInput?.current?.files.length){
            return;
        }

       
        const arquivo = referenciaInput?.current?.files[0]; 
        obterUrlDaImagemEAtualizarEstado(arquivo);
    }

    const aoSoltarAImagem = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const arquivo = e.dataTransfer.files[0];
            obterUrlDaImagemEAtualizarEstado(arquivo);
        }
    }


        const obterUrlDaImagemEAtualizarEstado = (arquivo) => {
        const fileReader=new FileReader(); //fileReader = classe do JavaScript
        fileReader.readAsDataURL(arquivo);        //readAsDataUR metodo que devolve a url de um arquivo
        fileReader.onloadend = () =>{        //onloadend = saber se o arquivo já foi carregado
            setImagem({
                preview: fileReader.result,
                arquivo
            });
        } 
    }
   
     


    return(
        <>
        <div className={`uploadImagemContainer ${className}`}         
            onClick={abrirSeletorArquivos}
            onDragOver={e => e.preventDefault()}
            onDrop={aoSoltarAImagem}
        >
              {imagemPreview && (
                <div className='imagemPreviewContainer'>
                    <img
                    src={imagemPreview}
                    alt='imagem preview'
                    className={imagemPreviewClassName}  
                    />                 
                </div>
            )}
                <input 
                    type='file' 
                    className='oculto' 
                    accept="image/*"
                    ref={referenciaInput}
                    onChange={aoAlterarImagem}
                />
        </div>
        </>
    );  

}