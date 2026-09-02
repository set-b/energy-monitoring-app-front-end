export async function getSunriseSunset(lat, lng) {
  const res = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
  );
  const json = await res.json();

  const sunrise = new Date(json.results.sunrise);
  const sunset = new Date(json.results.sunset);

  const format = (date) =>
    date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Amsterdam',
    });

  return {
    sunrise: format(sunrise),
    sunset: format(sunset),
  };
}