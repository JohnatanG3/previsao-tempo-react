import './WeatherInformationFiveDays.css'

function WeatherInformationFiveDays({ weatherFiveDays }) {
    let dailyForecast = {}

    for(let forecast of weatherFiveDays.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()

        if (!dailyForecast[date]) { 
            dailyForecast[date] = forecast;
        }
    }

    const nextFiveDays = Object.values(dailyForecast).slice(1,6)

    function convertDate(date) {
        const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR', {weekday: 'long', day: '2-digit'})
        return newDate
    }

    return (
        <div className='weather-container'>
            <h3>Previsão do Tempo Para os Próximos 5 Dias</h3>
            <div className='weather-list'>
                {nextFiveDays.map(forecast => (
                    <div key={forecast.dt} className='weather-item'>
                        <p className='forecast-day'>{convertDate(forecast)}</p>
                        <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="Icone do Tempo" />
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>{Math.round(forecast.main.temp_min)}ºC Min / {Math.round(forecast.main.temp_max)}ºC Máx</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeatherInformationFiveDays