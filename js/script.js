const paginaSig = document.getElementById('next-page');
const paginaPre = document.getElementById('prev-page');
const personajesList = document.getElementById('character-list');

let currentPag = 1;

function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then((data) => {
      displayCharacters(data.results);
      console.log(data.results);
    })
    .catch((error) => {
      console.error('No de pudo obtener personasjes. Eror: ', error);
    });
}

function displayCharacters(characters) {
    personajesList.innerHTML = ''; // Limpiar pagina de los personajes

    characters.forEach(character => {
        const listItem = document.createElement('li');
    
        const characterImage = document.createElement('img');
        characterImage.src = character.image;
        characterImage.alt = `Imagen de ${character.name}`;
    
        const characterName = document.createElement('h3');
        characterName.textContent = character.name;
    
        const characterSpecies = document.createElement('p');
        characterSpecies.textContent = `Species: ${character.species}`;
    
        listItem.appendChild(characterImage);
        listItem.appendChild(characterName);
        listItem.appendChild(characterSpecies);
    
        personajesList.appendChild(listItem);
  });
}

paginaSig.addEventListener('click', () => {
  currentPag++;
  fetchCharacters(currentPag);
});

paginaPre.addEventListener('click', () => {
  if (currentPag > 1) {
    currentPag--;
    fetchCharacters(currentPag);
  }
});

fetchCharacters(currentPag); //--> primera pag inicial