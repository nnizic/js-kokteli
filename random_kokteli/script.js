let kontejner = document.getElementById("kontejner");
kontejner.innerHTML = "<h2>KOKTELI</h2>";
let crta = document.createElement("hr");
kontejner.append(crta);
let catJfacts = null;
let nazivi = [];

async function dohvati() {
  try {
    for (let i = 0; i < 20; i++) {
      let cocktails = await fetch(
        "https://thecocktaildb.com/api/json/v1/1/random.php",
      );
      jsonCocktail = await cocktails.json();
      nazivi.push(jsonCocktail.drinks);
    }
  } catch (e) {
    console.log(e);
  } finally {
    nazivi.forEach((naziv) => {
      let podkontejner = document.createElement("div");
      podkontejner.classList.add("podkontejner");
      podkontejner.innerHTML = `<strong>${naziv[0].strDrink}</strong><br />`;
      let img = new Image(150, 150);
      img.src = naziv[0].strDrinkThumb;
      podkontejner.appendChild(img);
      let opiskontejner = document.createElement("div");
      opiskontejner.innerHTML = `${naziv[0].strIngredient1} <br/> ${naziv[0].strIngredient2}<br/> ${naziv[0].strIngredient3}`;
      podkontejner.classList.add("maliDiv");
      podkontejner.append(opiskontejner);
      kontejner.append(podkontejner);
    });
  }
}
dohvati();
