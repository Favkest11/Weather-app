import { getWeatherImg } from "../utils/GetWeatherImg"
function Hourly({weather,iscelsius}){
    return(
<div id="hourly-forecast">
      <div id="head4-select-holder">
      <h4>Hourly forecast</h4>
      </div>
      <div id="main-hourly-holder">
      <div className='hourly-holder'>
        <div className='f'>
          {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[0])}></img>
          )}
      
        12AM
      </div>
      {weather&&(
        <div>
        <p>{iscelsius ? `${weather.hourly.temperature_2m[0]}°` : `${((weather.hourly.temperature_2m[0]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
      
      </div>
      <div className='hourly-holder'>
          <div className='f'>
      {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[3])}></img>
          )}
        3AM
      </div>
       {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[3]}°` : `${((weather.hourly.temperature_2m[3]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
        
        </div> 
      <div className='hourly-holder'>
          <div className='f'>
       {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[6])}></img>
          )}
        6AM
      </div>
        
         {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[6]}°` : `${((weather.hourly.temperature_2m[6]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
      </div>
      <div className='hourly-holder'>
          <div className='f'>
       {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[9])}></img>
          )}
        9AM
      </div>
         {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[9]}°` : `${((weather.hourly.temperature_2m[9]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
      </div>
      <div className='hourly-holder'>
         <div className='f'>
       {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[12])}></img>
          )}
        12PM
      </div>
           {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[12]}°` : `${((weather.hourly.temperature_2m[12]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
      </div>

      <div className='hourly-holder'>
          <div className='f'>
       {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[15])}></img>
          )}
        3PM
      </div>
            
             {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[15]}°` : `${((weather.hourly.temperature_2m[15]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
      </div>
      <div className='hourly-holder'>
          <div className='f'>
       {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[18])}></img>
          )}
        6PM
      </div>
            
             {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[18]}°` : `${((weather.hourly.temperature_2m[18]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}
      </div>
      <div className='hourly-holder'>
         <div className='f'>
       {weather&&(
          <img src={getWeatherImg(weather.hourly.weathercode[21])}></img>
          )}
        9PM
      </div>   
            
             {weather&&(
        <div>
          <p>{iscelsius ? `${weather.hourly.temperature_2m[21]}°` : `${((weather.hourly.temperature_2m[21]*9)/5+32).toFixed(1)}°`}</p>
        </div>
      )}     
      </div>
      </div>
      
    </div>
    

    )

}
export default Hourly
