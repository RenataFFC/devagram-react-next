import { useRouter } from "next/router";
import UsuarioService from "../services/UsuarioServices"

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente){
    return (props) => {
      const router = useRouter();

      if(typeof window !== 'undefined'){
          if(!usuarioService.estaAutenticado()){
              router.replace('/');
              return null;
            }

            const usuarioLogado = usuarioService.obterInformacoesDoUsuarioLogado();
          return (                       
            <>
            <Header usuarioLogado={usuarioLogado}/>
            <Componente usuarioLogado={usuarioLogado}{...props}/>
            <Footer usuarioLogado={usuarioLogado} />
            </>
          );
      }
      return null;
    }

}