const kontejnerBotun = document.getElementById('botuni');
const koktel = document.getElementById('cocktail');
koktel.append(document.createElement('hr'));
const kontejner = document.createElement('div');
kontejner.classList.add('kontejner');
koktel.append(kontejner);
async function dohvatiKoktel(slovo) {
  let kokteli = {};
  try {
    const rezultat = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${slovo}`,
    );
    kokteli = await rezultat.json();
  } catch (greska) {
    koktel.innerHTML = `Došlo je do greške. Greška je: ${greska}`;
  } finally {
    kokteli.drinks.forEach((broj) => {
      const divAppend = document.createElement('div');
      divAppend.innerHTML = `<strong>${broj.strDrink}</strong><br />${broj.strCategory}`;
      divAppend.classList.add('cocktailDiv');
      kontejner.insertAdjacentElement('beforeend', divAppend);
      // const img = document.createElement('img');
      const img = new Image(100, 100);
      img.src = broj.strDrinkThumb;
      divAppend.appendChild(img);
      const opis = document.createElement('p');
      opis.innerHTML = `${broj.strIngredient1}<br/>${broj.strIngredient2}<br/>${broj.strIngredient3}<br/><hr/>`;
      divAppend.appendChild(opis);
    });
  }
}
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
alphabet.forEach((slovo) => {
  const searchBotun = document.createElement('button');
  searchBotun.addEventListener('click', () => {
    brisiPretragu();
    dohvatiKoktel(slovo);
  });
  searchBotun.innerHTML = slovo;
  searchBotun.classList.add('botun');
  kontejnerBotun.append(searchBotun);
});

function brisiPretragu() {
  let el = kontejner.lastElementChild;
  while (el) {
    kontejner.removeChild(el);
    el = kontejner.lastElementChild;
  }
}
const brisiBotun = document.createElement('button');
brisiBotun.addEventListener('click', () => brisiPretragu());
brisiBotun.innerHTML = 'Izbriši pretragu';
brisiBotun.classList.add('brbotun');
kontejnerBotun.append(brisiBotun);
