 export function getWeekDay(weather,index) {
    if (!weather) return "";
    const dateStr = weather.hourly.time[index];
    const date = dateStr.split("T")[0];
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  }