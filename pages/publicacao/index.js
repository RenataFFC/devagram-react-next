import { useState } from "react";
import Button from "../../components/buttom";
import comAutorizacao from "../../hoc/comAutorizacao";
import HeaderComAcoes from "../../components/headerComAcoes";
import UploadImagem from "../../components/uploadImagem";
import imagemPublicacao from '../../public/imagens/imagemPublicacao.svg'; 
import imagemSetaEsquerda from '../../public/imagens/setaEsquerda.svg';
import { useRouter } from 'next/router';
import FeedService from "../../services/FeedService";


const limiteDaDescricao =255;
const descricaoMinima = 3;
const feedService = new FeedService();

 function Publicacao(){
      const [imagem,setImagem] = useState();
      const [descricao, setDescricao] =  useState('');
      const [inputImagem, setInputImagem] =  useState();
      const [etapaAtual, setEtapaAtual] =  useState(1);
      const router = useRouter();
      
      const estaNaEtapaUm = () => etapaAtual ===1;

           
      const obterTextoEsquerdaHeader = () => {
          if (estaNaEtapaUm() && imagem) {
              return 'Cancelar';
          }
          return '';
     };
     
      const obterTextoDireitaHeader = () => {
            if (!imagem) {
              return "";
            }
        
            if (estaNaEtapaUm()) {
              return "Avançar";
            }
    
            return "Compartilhar";
      };

      const aoClicarAcaoEsquerdaHeader = () => {
            if(estaNaEtapaUm()){
              inputImagem.value = null;
              setImagem(null);
              return;
            }
            setEtapaAtual(1);
      };

      const aoClicarAcaoDireitaHeader = () => {
            if(estaNaEtapaUm()){
              setEtapaAtual(2);
              return;
            }  
            publicar();
      };

      const escreverDescricao = (e) => {
              const valorAtual = e.target.value;
              if (valorAtual.length >= limiteDaDescricao) {
                  return;
              }
            setDescricao(valorAtual);
        };

      const obterClassNameHeader = () => {
            if (estaNaEtapaUm()) {
                return 'primeiraEtapa';
            }

            return 'segundaEtapa';
      };

      const publicar = async () => {
        try {
            if(!validarFormulario()){
              alert('A descrição precisa ter pelo menos 3 caracteres e a imagem precisa estar selecionada.');
                
              return;
            }

            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

            await feedService.fazerPublicacao(corpoPublicacao);
          
            router.push('/');

        } catch (e) {
          console.log(e + " Erro ao salvar publicação");
        }
      };

      const validarFormulario = () => {
        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        );
      };
 

   return(
     <div className="paginaPublicacao largura30pctDesktop">     
       <HeaderComAcoes
        className={obterClassNameHeader()}
        iconeEsquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda}
        textoEsquerda={obterTextoEsquerdaHeader()}
        aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaHeader}
        elementoDireita={obterTextoDireitaHeader()}
        aoClicarElementoDireita={aoClicarAcaoDireitaHeader}
        titulo='Nova Publicação'   
        />

         <hr className='linhaDivisoria' />

          <div className="conteudoPaginaPublicacao">
              {estaNaEtapaUm() ? (

                  <div className="primeiraEtapa">

                      <UploadImagem
                          setImagem={setImagem}
                          aoSetarAReferencia={setInputImagem}
                          imagemPreviewClassName={!imagem? 'previewImagemPublicacao':'previewImagemSelecionada'}
                          imagemPreview={imagem?.preview || imagemPublicacao.src}
                      />

                      <span className="desktop textoDragAndDrop"> Arraste sua imagem aqui! </span>
                     
                      <Button
                            texto='Selecionar uma imagem'
                            manipularClique={() => inputImagem?.click()}
                      />    

                   </div>
              ) : (
                    <>
                        <div className="segundaEtapa">

                            <UploadImagem
                              setImagem={setImagem}
                              imagemPreview={imagem.preview}                  
                            />

                            <textarea
                              rows={3}
                              value={descricao}
                              placeholder="Escreva uma legenda..."
                              onChange={escreverDescricao}
                            ></textarea>  

                       </div>

                        <hr className='linhaDivisoria' />

                    </>
                   )}
              </div>
         </div>       
  );
}

  export default comAutorizacao(Publicacao);