import Buttom from '../components/botao';
import Avatar from '../components/avatar';

export default function Home() {
  return (
    <>
      <h1>Olá Mundo</h1>
      <div style={{width:250}}>
        <Avatar/>
      <Buttom text={'login'} cor='outline' desabilitado={true} manipularClique={() => console.log('botao clicado')}/>       
      </div>
    </>
  )
}
