import { useState, useRef, useEffect  } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformation from './components/WeatherInformation/WeatherInformation'
import WeatherInformationFiveDays from './components/WeatherInformationFiveDays/WeatherInformationFiveDays'

function App() {
  const [weather, setWeather] = useState({})
  const [weatherFiveDays, setWeatherFiveDays] = useState()
  const inputRef = useRef()

  useEffect(() => {
    // Focar automaticamente no input quando o componente for montado
    inputRef.current.focus()

    // Função para lidar com a tecla "Enter"
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        searchCity(); // Chama a função searchCity() quando a tecla "Enter" é pressionada
      }
    }

    // Adiciona o evento de escuta para a tecla "Enter"
    document.addEventListener("keydown", handleKeyDown);

    // Remove o evento ao desmontar o componente
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  async function searchCity() {
    const city = inputRef.current.value
    const key = "7bc7c3c1aa7521d0e535c25a528e593a"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const urlFiveDays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const apiInfo = await axios.get(url)
    const apiInfoFiveDays = await axios.get(urlFiveDays)
    setWeather(apiInfo.data)
    setWeatherFiveDays(apiInfoFiveDays.data)
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digita o Nome da Cidade' />
      <button onClick={searchCity}>Buscar</button>
      
      <WeatherInformation weather={weather} />
      {weatherFiveDays && <WeatherInformationFiveDays weatherFiveDays={weatherFiveDays} />}
    </div>
  )
}

export default App
