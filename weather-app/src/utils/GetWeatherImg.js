import sunny from '../images/icon-sunny.webp'
import cloudy from '../images/icon-partly-cloudy.webp'
import fog from '../images/icon-fog.webp'
import rain from '../images/icon-rain.webp'
import snow from '../images/icon-snow.webp'
import storm from '../images/icon-storm.webp'

export function getWeatherImg(weathercode) {
  if (weathercode === 0) return sunny
  if (weathercode >= 1 && weathercode <= 3) return cloudy
  if (weathercode === 45 || weathercode === 47) return fog
  if (weathercode >= 51 && weathercode <= 67) return rain
  if (weathercode >= 71 && weathercode <= 77) return snow
  if (weathercode >= 95) return storm

  return sunny
}
