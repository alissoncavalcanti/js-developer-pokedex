const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 10;
let offset = 0;


function loadPokemonItems (offset, limit) {
    pokeApi.getPokemon(offset, limit).then(function(response = []) {
        const newHTML = response.map ((pokemon) => `
        <li class="species ${pokemon.type}">
                <button class="pokemon-button">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </button>
        </li>
    `).join('');
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItems (offset,limit)
    

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }

    
});

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

pokemonList.addEventListener('click', (e) => {
    const btn = e.target.closest('.pokemon-button');
    if (!btn) return;

    const name = btn.querySelector('.name').textContent;
    const number = btn.querySelector('.number').textContent;
    const img = btn.querySelector('img').src;
    const types = [...btn.querySelectorAll('.types li')].map(li => li.textContent);

    modalBody.innerHTML = `
      <h4 style="text-align:right">${number}</h4>
      <h1 style="text-transform:capitalize">${name}</h1>
      <div class="typePhoto">
      <ol class="types">
        ${types.map(type => `<li class="type ${type.toLowerCase()}">${type}</li>`).join('')}
      </ol>
      <img src="${img}" alt="${name}" style="max-width:30vw;">
      </div>
    `;

    const typeClasses = [
      'normal', 'grass', 'fire', 'water', 'electric', 'ice', 'ground',
      'flying', 'poison', 'fighting', 'psychic', 'dark', 'rock',
      'bug', 'ghost', 'steel', 'dragon', 'fairy'
    ];
    modalContent.classList.remove(...typeClasses);

    const [type] = types;
    modalContent.classList.add(type);

    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});