let kontejner = document.getElementById("kontejner");
let podkontejner = document.createElement("div");
podkontejner.classList.add("podkontejner");
kontejner.append(podkontejner);
async function getWeatherData() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=44.07&longitude=15.14&current=temperature_2m,relative_humidity_2m,wind_speed_10m",
    );
    const data = await res.json();

    podkontejner.innerHTML = `<h1>Dnevni Izvještaj</h1><h2> ${data.current.time.replace("T", " ")}</h2> <p><strong>Temperatura:</strong> ${data.current.temperature_2m}${data.current_units.temperature_2m}</p>
          <p><strong>Vlažnost: </strong>  ${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}
          <p><strong>Brzina vjetra: </strong>  ${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`;
  } catch (err) {
    kontejner.innerHTML = err;
  }
}
getWeatherData();
