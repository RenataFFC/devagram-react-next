import UsuarioService from "@/services/UsuarioServices"
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente){
    return(props) => {
      const router = useRouter();

      if(typeof window !== 'undefined'){
          if(usuarioService.estaAutenticado()){
              router.replace('/cadastro');
              return null;
            }
          return (
            
            
            <>
            <Componente{...props}/></>
          );
      }
      return null;
    }

}