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

// Call the function and handle the result
fetchWeatherData()
  .then((weatherData) => {
    weatherData.forEach((day) => {
      const mappodkontejner = document.createElement('div');
      mappodkontejner.classList.add('podkontejner');
      mapkontejner.append(mappodkontejner);
      mappodkontejner.innerHTML = `<p>${day.icon}
        <p>Za dan: ${day.datetime}</p><p>Temperatura: ${day.temperature}</p><p>Opis: ${day.description}</p>`;
    });
  })
  .catch((err) => {
    mapkontejner.innerHTML = err;
  });
