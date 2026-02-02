import { getWeatherImg } from '../utils/GetWeatherImg'

function LeftPart({
  city,
  weather,
  iscelsius,
  iskmperhour,
  ismm,
  background,
}) {

  
  function getWeekDay(index) {
    if (!weather) return "";
    const dateStr = weather.hourly.time[index];
    const date = dateStr.split("T")[0];
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  }

  function getMinTemp(firstindex, lastindex) {
    if (!weather) return 0;
    const temparray = [];
    for (let i = firstindex; i < lastindex; i++) {
      temparray.push(weather.hourly.temperature_2m[i]);
    }
    const mintemp = Math.min(...temparray);
    return mintemp;
  }

  function getMaxTemp(firstindex, lastindex) {
    if (!weather) return 0;
    const temparray = [];
    for (let i = firstindex; i < lastindex; i++) {
      temparray.push(weather.hourly.temperature_2m[i]);
    }
    const maxtemp = Math.max(...temparray);
    return maxtemp;
  }
  

  if (!weather) return null

  return (
    <div id="left-part">
      <img id="background-img" src={background} alt="background"></img>
      <div id="city-date-holder">
        {weather && (
          <div>
            <h3>{city}</h3>
            <p>{weather.current.time.split("T")[0]}</p> 
          </div>
        )}
      </div>

      <div id="degrees-img-holder">
        {weather && (
          <img
            id="weather-img"
            src={getWeatherImg(weather.current.weathercode)}
            alt="Weather"
          />
        )}

        {weather && (
          <h2>{iscelsius ? `${weather.current.temperature_2m}°C` : `${((weather.current.temperature_2m * 9) / 5 + 32).toFixed(1)}°F`}
          </h2>
        )}
      </div>

      {/* Conditions */}
      <div id="conditions-holder">
        <div className='condition'>
          {weather && (
            <div>
              <p>Feels Like</p>
              <h3>{iscelsius ? `${weather.current.temperature_2m}°C` : `${((weather.current.temperature_2m * 9) / 5 + 32).toFixed(1)}°F`}</h3>
            </div>
          )}
        </div>
        <div className='condition'>
          {weather && (
            <div>
              <p>Humidity</p>
              <h3>{weather.hourly.relative_humidity_2m[0]}%</h3>
            </div>
          )}
        </div>
        <div className='condition'>
          {weather && (
            <div>
              <p>Wind</p>
              <h3>{iskmperhour ? `${weather.current.wind_speed_10m}km/h` : `${((weather.current.wind_speed_10m) / 1.6).toFixed(1)}mph`}</h3>
            </div>
          )}
        </div>
        <div className='condition'>
          {weather && (
            <div>
              <p>Precipitation</p>
              <h3>{ismm ? `${weather.daily.precipitation_sum[0]}mm` : `${((weather.daily.precipitation_sum[0]) / 25).toFixed(1)}in`}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Daily */}
      <h4>Daily forecast</h4>
      <div id='daily-forecast'>
        {/* Day 0 (Today) */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(0)}</p>
          {weather && (
            <img src={getWeatherImg(weather.daily.weathercode[0])} alt="day"></img>
          )}
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(0, 24)}°` : `${((weather && getMaxTemp(0, 24) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(0, 24)}°` : `${((weather && getMinTemp(0, 24) * 9) / 5 + 32).toFixed(0)}°`}</p>
          </div>
        </div>
        {/* Day 1 */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(24)}</p>
          <img src={getWeatherImg(weather.daily.weathercode[1])} alt="day"></img>
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(24, 48)}°` : `${((weather && getMaxTemp(24, 48) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(24, 48)}°` : `${((weather && getMinTemp(24, 48) * 9) / 5 + 32).toFixed(1)}°`}</p>
          </div>
        </div>
        {/* Day 2 */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(48)}</p>
          <img src={getWeatherImg(weather.daily.weathercode[2])} alt="day"></img>
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(48, 72)}°` : `${((weather && getMaxTemp(48, 72) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(48, 72)}°` : `${((weather && getMinTemp(48, 72) * 9) / 5 + 32).toFixed(1)}°`}</p>
          </div>
        </div>
        {/* Day 3 */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(72)}</p>
          <img src={getWeatherImg(weather.daily.weathercode[3])} alt="day"></img>
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(72, 96)}°` : `${((weather && getMaxTemp(72, 96) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(72, 96)}°` : `${((weather && getMinTemp(72, 96) * 9) / 5 + 32).toFixed(1)}°`}</p>
          </div>
        </div>
        {/* Day 4 */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(96)}</p>
          <img src={getWeatherImg(weather.daily.weathercode[4])} alt="day"></img>
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(96, 120)}°` : `${((weather && getMaxTemp(96, 120) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(96, 120)}°` : `${((weather && getMinTemp(96, 120) * 9) / 5 + 32).toFixed(1)}°`}</p>
          </div>
        </div>
        {/* Day 5 */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(120)}</p>
          <img src={getWeatherImg(weather.daily.weathercode[5])} alt="day"></img>
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(120, 144)}°` : `${((weather && getMaxTemp(120, 144) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(120, 144)}°` : `${((weather && getMinTemp(120, 144) * 9) / 5 + 32).toFixed(1)}°`}</p>
          </div>
        </div>
        {/* Day 6 */}
        <div className='day-holder'>
          <p>{weather && getWeekDay(144)}</p>
          <img src={getWeatherImg(weather.daily.weathercode[6])} alt="day"></img>
          <div className="daily-degrees">
            <p>{iscelsius ? `${weather && getMaxTemp(144, 168)}°` : `${((weather && getMaxTemp(144, 168) * 9) / 5 + 32).toFixed(1)}°`}</p>
            <p>{iscelsius ? `${weather && getMinTemp(144, 168)}°` : `${((weather && getMinTemp(144, 168) * 9) / 5 + 32).toFixed(1)}°`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftPart