import { useState,useEffect} from 'react'
import Search from './components/Search'
import LeftPart from './components/LeftPart'
import { getWeatherImg } from './utils/GetWeatherImg'
import logo from './images/logo.svg'
import search from './images/icon-search.svg'
import background from './images/bg-today-large.svg'
import units from './images/icon-units.svg'
import dropdown from './images/icon-dropdown.svg'


import './App.css'

function App() {
  const [isVisible,setIsVisible]=useState(false);
    const [city,setCity]=useState("Poznan");
    const [typingCity,setTypingCity]=useState("");
    const [weather,setWeather]=useState(null);
    const[iscelsius,setIscelsius]=useState(true);
    const[iskmperhour,setIskmperhour]=useState(true);
    const[ismm,setIsmm]=useState(true);
 
/* Get api*/
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
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}
&current=temperature_2m,wind_speed_10m,weathercode
&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode
&daily=weathercode,precipitation_sum
&timezone=auto`;

      const data=await fetch(url).then(r=>r.json());
       setWeather(data);
       } catch (error) {
        
      }
     
    };
    getData();
    
  },[city])
  /* Functions*/
 
    const toggleUnitsDropdown = () => {
    setIsVisible(prev => !prev);
  };
  
    if (!weather) {
  return <p>Loading...</p>;
}
  return(
    
    <div>
    
      
      <div id="top-part">
        {/* Top left image-logo */}
     <img  id="weather-logo"src={logo}></img>
     {/* Top right button "Units" */}
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
      {/* Search field */}
      <h1>How's the sky looking today?</h1>
      <Search
      typingCity={typingCity}
  setTypingCity={setTypingCity}
  onSearch={() => setCity(typingCity)}
  searchIcon={search}
      />
      <div id="main-container">
        {/* Today Card */}
    <LeftPart
    city={city}
    weather={weather}
    iscelsius={iscelsius}
    iskmperhour={iskmperhour}
    ismm={ismm}
    background={background}
    />
    <div id="right-part">
      {/* Hourly */}
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
    </div>
    </div>
</div>
  )
}

export default App
