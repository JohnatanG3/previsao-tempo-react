import './WeatherInformationFiveDays.css';

function WeatherInformationFiveDays({ weatherFiveDays }) {
    if (!weatherFiveDays || !weatherFiveDays.list) {
        console.log('Dados não disponíveis:', weatherFiveDays);
        return <p>Carregando dados do clima...</p>;
    }

    let dailyForecast = {};
    const today = new Date().toLocaleDateString();

    for (let forecast of weatherFiveDays.list) {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();

        if (date !== today && !dailyForecast[date]) {
            dailyForecast[date] = forecast;
        }
    }

    // Pegar 5 dias a partir de hoje, preenchendo lacunas, se necessário
    const allDates = Object.keys(dailyForecast);
    const nextFiveDays = [];

    for (let i = 1; i <= 5; i++) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + i);
        const formattedDate = targetDate.toLocaleDateString();

        if (dailyForecast[formattedDate]) {
            nextFiveDays.push(dailyForecast[formattedDate]);
        } else {
            // Preencha lacunas com um placeholder vazio
            nextFiveDays.push({
                dt: targetDate.getTime() / 1000, // Timestamp do dia vazio
                main: { temp_min: null, temp_max: null },
                weather: [{ description: 'Sem dados', icon: '01d' }],
            });
        }
    }

    function convertDate(date) {
        return new Date(date.dt * 1000).toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
        });
    }

    return (
        <div className='weather-container'>
            <h3>Previsão do Tempo Para os Próximos 5 Dias</h3>
            <div className='weather-list'>
                {nextFiveDays.map((forecast) => (
                    <div key={forecast.dt} className='weather-item'>
                        <p className='forecast-day'>{convertDate(forecast)}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                            alt='Ícone do Tempo'
                        />
                        <p className='forecast-description'>{forecast.weather[0].description}</p>
                        <p>
                            {forecast.main.temp_min !== null
                                ? `${Math.round(forecast.main.temp_min)}ºC Min`
                                : 'Sem dados'}{' '}
                            /{' '}
                            {forecast.main.temp_max !== null
                                ? `${Math.round(forecast.main.temp_max)}ºC Máx`
                                : 'Sem dados'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInformationFiveDays;