export default function Buttom({
  type ='button',
  text,
  cor = 'primary',
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
