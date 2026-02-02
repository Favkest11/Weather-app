 export function getMinTemp(weather,firstindex, lastindex) {
    if (!weather) return 0;
    const temparray = [];
    for (let i = firstindex; i < lastindex; i++) {
      temparray.push(weather.hourly.temperature_2m[i]);
    }
    const mintemp = Math.min(...temparray);
    return mintemp;
  }