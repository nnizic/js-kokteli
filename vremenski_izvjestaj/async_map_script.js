const mapkontejner = document.getElementById('map_kontejner');
async function fetchWeatherData() {
  try {
    const response = await fetch(
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Zadar?unitGroup=metric&key=ZQVJ86FZTZXZVSWNPT6CHURBH&contentType=json',
      {
        method: 'GET',
        headers: { accept: 'application/json' },
      },
    );

    const data = await response.json();

    // Map over the days and return the relevant information
    return data.days.map((day) => ({
      icon: day.icon,
      datetime: day.datetime,
      temperature: day.temp,
      description: day.description,
    }));
  } catch (err) {
    mapkontejner.innerHTML = err;
    throw err; // re-throw the error to handle it when calling the function
  }
}

function fetchWeatherIcon(icon) {
  switch (icon) {
    case 'partly-cloudy-day':
      return "<i class='fas fa-cloud-sun' style='font-size:36px'></i>";
    case 'cloudy':
      return "<i class='fas fa-cloud' style='font-size:36px'></i>";
    case 'rain':
      return "<i class='fas fa-cloud-rain' style='font-size:36px'></i>";
    case 'clear-day':
      return "<i class='fas fa-sun' style='font-size:36px'></i>";
    default:
      return '<h7>no icon found</h7>';
  }
}

function croatianDate(date) {
  const splitter = date.split('-');
  const datum = `${splitter[2]}-${splitter[1]}-${splitter[0]}`;
  return datum;
}
// Call the function and handle the result
fetchWeatherData()
  .then((weatherData) => {
    weatherData.forEach((day) => {
      const mappodkontejner = document.createElement('div');
      mappodkontejner.classList.add('podkontejner');
      mapkontejner.append(mappodkontejner);
      mappodkontejner.innerHTML = `<p>${fetchWeatherIcon(day.icon)}
        <p>Za dan: ${croatianDate(day.datetime)}</p><p>Temperatura: ${day.temperature}</p><p>Opis: ${day.description}</p>`;
    });
  })
  .catch((err) => {
    mapkontejner.innerHTML = err;
  });
