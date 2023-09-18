import comAutorizacao from "../../hoc/comAutorizacao";
import HeaderComAcoes from "../../components/headerComAcoes";
import UploadImagem from "../../components/uploadImagem";
import { useState } from "react";
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg'; 
import Button from "../../components/buttom";



 function Publicacao(){

  const[imagem,setImagem] = useState();
  const [inputImagem, setInputImagem] =  useState();
   return(
     <div className="paginaPublicacao largura30pctDesktop">
     
       <HeaderComAcoes
        textoEsquerda='Cancelar'
        elementoDireita={'Avançar'}
        titulo='Nova Publicação'   
        />

          <div className="conteudoPaginaPublicacao">
          <div className="primeiraEtapa">
              <UploadImagem
                  setImagem={setImagem}
                  aoSetarAReferencia={setInputImagem}
                  imagemPreviewClassName={imagem? 'previewImagemPublicacao':'previewImagemSelecionada'}
                  imagemPreview={imagem?.preview || imagemPublicacao.src}
              />
              <span className="desktop textoDragAndDrop"> Arraste sua imagem aqui! </span>
                <Button
               texto='Selecionar uma imagem'
               manipularClique={() => inputImagem?.click()}

                />    
          </div>
          </div>
     </div>
     
  )}

  export default comAutorizacao(Publicacao);