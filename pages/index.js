import { useEffect, useState } from 'react';
import Login from '../components/login';
import UsuarioService from '@/services/UsuarioServices';
import Home from '../components/home';

const usuarioService = new UsuarioService()

export default function Index() {

   const [estaAutenticado, setEstaAutenticado] = useState(false);

      useEffect(() => {
         setEstaAutenticado(
            usuarioService.estaAutenticado()
            );      
      }, []);
      if(estaAutenticado){
         return <Home/>   
      }
      return  <Login aposAutenticacao ={() => setEstaAutenticado(true)}/>
      
   }