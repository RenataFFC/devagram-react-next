export default function Buttom({
  type ='button',
  text,
  cor = 'primaria',
  desabilitado = false,
  manipularClique
}){
    return(
     <button 
        type={type}
        className={`btn ${cor}`}
        disabled={desabilitado}    
        onClick={manipularClique}    
        >
          {text}
        </button>
    );
}
