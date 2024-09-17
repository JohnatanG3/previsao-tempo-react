import './WeatherInformation.css'

function WeatherInformation({ weather }) {
    if (!weather || !weather.main || !weather.weather || weather.weather.length === 0) {
        return <p>Nenhuma Informação de Clima Disponível!</p>;
    }

    return (
        <div className='weather-container'>
            <h2>{weather.name}</h2>

            <div className='weather-info'>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Icone do Tempo" />
                <p className='temperature'>{Math.round(weather.main.temp)}ºC</p>
            </div>
            
            <p className='description'>{weather.weather[0].description}</p>
            
            <div className='details'>
                <p>Sensação Térmica: {Math.round(weather.main.feels_like)}ºC</p>
                <p>Umidade: {weather.main.humidity}%</p>
                <p>Pressão:{weather.main.pressure} mb</p>
            </div>        
        </div>
    )

}

export default WeatherInformation