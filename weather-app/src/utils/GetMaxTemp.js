   export function getMaxTemp(weather,firstindex, lastindex) {
    if (!weather) return 0;
    const temparray = [];
    for (let i = firstindex; i < lastindex; i++) {
      temparray.push(weather.hourly.temperature_2m[i]);
    }
    const maxtemp = Math.max(...temparray);
    return maxtemp;
  }