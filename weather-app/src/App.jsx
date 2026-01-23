import { useState,useEffect} from 'react'
import logo from './images/logo.svg'
import search from './images/icon-search.svg'
import background from './images/bg-today-large.svg'
import units from './images/icon-units.svg'
import dropdown from './images/icon-dropdown.svg'
import sunny from './images/icon-sunny.webp'
import storm from './images/icon-storm.webp'
import snow from './images/icon-snow.webp'
import rain from './images/icon-rain.webp'
import cloudy from './images/icon-partly-cloudy.webp'
import fog from './images/icon-fog.webp'

import './App.css'

function App() {
  const [isVisible,setIsVisible]=useState(false);
    const [city,setCity]=useState("Poznan");
    const [typingCity,setTypingCity]=useState("");
    const [weather,setWeather]=useState(null);
    const[iscelsius,setIscelsius]=useState(true);
    const[iskmperhour,setIskmperhour]=useState(true);
    const[ismm,setIsmm]=useState(true);
 

  useEffect(()=>{
    if(!city)return;
    const getData=async()=>{
      try {
        const geoUrl=`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`;
      const geo= await fetch(geoUrl).then(r=>r.json());
           if (!geo.results || geo.results.length === 0) {
          alert("City not found");
          return;
        }
     
        const{latitude,longitude}=geo.results[0];
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation,weathercode&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;


      const data=await fetch(url).then(r=>r.json());
       setWeather(data);
       } catch (error) {
        
      }
     
    };
    getData();
    
  },[city])
  function getWeekDay(index){
   const dateStr=weather.hourly.time[index]
   const date=dateStr.split("T")[0];
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  }
  function getMinTemp(firstindex,lastindex){
    const temparray=[];
    for(let i=firstindex;i<lastindex;i++){
      temparray.push(weather.hourly.temperature_2m[i]);
    }
    
    const mintemp=Math.min(...temparray);
    return mintemp;
  }
    function getMaxTemp(firstindex,lastindex){
    const temparray=[];
    for(let i=firstindex;i<lastindex;i++){
      temparray.push(weather.hourly.temperature_2m[i]);
    }
    
    const maxtemp=Math.max(...temparray);
    return maxtemp;
  }
    const toggleUnitsDropdown = () => {
    setIsVisible(prev => !prev);
  };
  const getWeatherImg=(weathercode)=>{
    if(weathercode===0) return sunny;
    if(weathercode>=1&&weathercode<=3)return cloudy;
    if(weathercode===45||weathercode===47)return fog;
    if(weathercode>=51&&weathercode<=67)return rain;
    if (weathercode >= 71 && weathercode <= 77) return snow;
    if (weathercode >= 95) return storm;

  return sunny;
  }
    if (!weather) {
  return <p>Loading...</p>;
}
  return(
    
    <div>
    
      
      <div id="top-part">
     <img  id="weather-logo"src={logo}></img>
     <button id='btn-units'
     onClick={toggleUnitsDropdown}
     >
      <img id="img-units"src={units}></img>
      Units
      <img id ="dropdown-img"src={dropdown}></img>
     </button>
     <div id="units-dropdown" style={{ display: isVisible ? "flex" : "none"}}>
      <p>Temperature</p>
      <button className='btn-units-dropdown' onClick={()=> setIscelsius(true)}>Celsius</button>
      <button className='btn-units-dropdown'onClick={()=> setIscelsius(false)}>Fahrenheit</button>
      <p>Wind Speed</p>
      <button className='btn-units-dropdown' onClick={()=> setIskmperhour(true)}>km/h</button>
      <button className='btn-units-dropdown'onClick={()=> setIskmperhour(false)}>mph</button>
       <p>Precipitation</p>
      <button className='btn-units-dropdown' onClick={()=> setIsmm(true)}>Millimeters</button>
      <button className='btn-units-dropdown'onClick={()=> setIsmm(false)}>Inches</button>
        
     </div>
     </div>
     
      <h1>How's the sky looking today?</h1>
      <div id="search-holder">
      <img id="search-img"src={search}></img>
      <input id="search-input" type="text" placeholder="Search for a place..."
     value={typingCity}
     onChange={(e=>setTypingCity(e.target.value))}
      
      ></input>
    <button id="search-btn"
    onClick={()=>setCity(typingCity)}
    >Search</button>
    </div>
      <div id="main-container">
    <div id="left-part">
    <img id="background-img" src={background}></img>
    <div id="city-date-holder">
      {weather&&(
        <div>
  <h3>{city}</h3>
  <p>{weather.current.time}</p>
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

    {weather&&(
      <h2>{iscelsius ? `${weather.current.temperature_2m}°C` : `${((weather.current.temperature_2m * 9) / 5 + 32).toFixed(1)}°F`}
</h2>
    )}
    
    </div>
    <div id="conditions-holder">
      <div className='condition'>
        {weather&&(
          <div>
  <p>Feels Like</p>
       <h3>{iscelsius ? `${weather.current.temperature_2m}°C` : `${((weather.current.temperature_2m * 9) / 5 + 32).toFixed(1)}°F`}</h3>
       </div>
        )}
      
     
        </div>
      <div className='condition'>
        {weather&&(
          <div>
      <p>Humidity</p>
       <h3>{weather.hourly.relative_humidity_2m[0]}%</h3>
          </div>
        )}
      
       
      </div>
      <div className='condition'>
        {weather&&(
          <div>
            <p>Wind</p>
       <h3>{iskmperhour ? `${weather.current.wind_speed_10m}km/h` :`${((weather.current.wind_speed_10m)/ 1.6).toFixed(1)}mph/h` }</h3>
          </div>
        )}
        
        </div>
      <div className='condition'>
        {weather&&(
          <div>
 <p>Precipitation</p>
       <h3>{ismm ? `${weather.current.precipitation}mm` : `${((weather.current.precipitation)/25).toFixed(1)}in` }</h3>
          </div>
        )}
       
        </div>
    </div>
    <h4>Daily forecast</h4>
    <div id='daily-forecast'>
      <div className='day-holder'>
        
        <p>{weather&&getWeekDay(0)}</p>
         {weather&&(
        <img src={getWeatherImg(weather.current.weathercode)}></img>
         )}
        <div className="daily-degrees">
          <p>{iscelsius ? `${weather&&getMaxTemp(0,24)}°` : `${((weather&&getMaxTemp(0,24) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(0,24)}°` : `${((weather&&getMinTemp(0,24) * 9) / 5 + 32).toFixed(0)}°`}</p>
        </div>
        </div>
      <div className='day-holder'>
        <p>{weather&&getWeekDay(24)}</p>
        <img src={sunny}></img>
        <div className="daily-degrees">
         <p>{iscelsius ? `${weather&&getMaxTemp(24,48)}°` : `${((weather&&getMaxTemp(24,48) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(24,48)}°` : `${((weather&&getMinTemp(24,48) * 9) / 5 + 32).toFixed(1)}°`}</p>
        </div>
        </div>
      <div className='day-holder'>
        <p>{weather&&getWeekDay(48)}</p>
        <img src={sunny}></img>
        <div className="daily-degrees">
          <p>{iscelsius ? `${weather&&getMaxTemp(48,72)}°` : `${((weather&&getMaxTemp(48,72) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(48,72)}°` : `${((weather&&getMinTemp(48,72) * 9) / 5 + 32).toFixed(1)}°`}</p>
        </div>
        </div>
      <div className='day-holder'>
        <p>{weather&&getWeekDay(72)}</p>
        <img src={sunny}></img>
        <div className="daily-degrees"> 
          <p>{iscelsius ? `${weather&&getMaxTemp(72,96)}°` : `${((weather&&getMaxTemp(72,96) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(72,96)}°` : `${((weather&&getMinTemp(72,96) * 9) / 5 + 32).toFixed(1)}°`}</p>
        </div>
        </div>
      <div className='day-holder'>
        <p>{weather&&getWeekDay(96)}</p>
        <img src={sunny}></img>
        <div className="daily-degrees">
        <p>{iscelsius ? `${weather&&getMaxTemp(96,120)}°` : `${((weather&&getMaxTemp(96,120) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(96,120)}°` : `${((weather&&getMinTemp(96,120) * 9) / 5 + 32).toFixed(1)}°`}</p>
       </div>
      </div>
      <div className='day-holder'>
        <p>{weather&&getWeekDay(120)}</p>
        <img src={sunny}></img>
        <div className="daily-degrees">
        <p>{iscelsius ? `${weather&&getMaxTemp(120,144)}°` : `${((weather&&getMaxTemp(120,144) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(120,144)}°` : `${((weather&&getMinTemp(120,144) * 9) / 5 + 32).toFixed(1)}°`}</p>
       </div>
      </div>
      <div className='day-holder'>
       <p>{weather&&getWeekDay(144)}</p> 
       <img src={sunny}></img>
       <div className="daily-degrees">
        <p>{iscelsius ? `${weather&&getMaxTemp(144,168)}°` : `${((weather&&getMaxTemp(144,168) * 9) / 5 + 32).toFixed(1)}°`}</p>
          <p>{iscelsius ? `${weather&&getMinTemp(144,168)}°` : `${((weather&&getMinTemp(144,168) * 9) / 5 + 32).toFixed(1)}°`}</p>
       </div>
      </div>
    </div>
    </div>
    <div id="right-part">
    <div id="hourly-forecast">
      <div id="head4-select-holder">
      <h4>Hourly forecast</h4>
      </div>
      <div id="main-hourly-holder">
      <div className='hourly-holder'>
        <div className='f'>
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
      <img src={sunny}></img>
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
    </div>
    </div>
</div>
  )
}

export default App
