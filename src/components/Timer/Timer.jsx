import { useState, useEffect } from "react"

export default function Timer(){
  const [time, setTime] = useState(25*60);// 25 minutos em segundos
  const [isRunning, setIsRunning] = useState(false)//controle do time rodando

  useEffect(() =>{
    let interval;

    if(isRunning){
      interval = setInterval(()=>{
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
      }, 1000)
    }else{
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  function toggleTimer(){
    setIsRunning(!isRunning);
  }

  //função que formata o tempo
  function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);//arredonda para baixo, deixando num inteiro
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    //garante que os minutos e segundos tenha 2 digitos
  }

  return(
    <div>
      <h2>{formatTime(time)}</h2>
      <button onClick={() => setIsRunning(true)}>Iniciar</button>
      <button onClick={() => setIsRunning(false)}>Pausar</button>
      <button onClick={()=> setTime(1500) } >Resetar</button>
    </div>
  )
}