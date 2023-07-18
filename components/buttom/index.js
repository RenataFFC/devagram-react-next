export default function Buttom({
  tipo ='button',
  texto,
  cor = 'primary',
  desabilitado = false,
  manipularClique
}){
    return(
     <button 
        type={tipo}
        className={`btn ${cor}`}
        disabled={desabilitado}    
        onClick={manipularClique}    
        >
          {texto}
        </button>
    );
}
