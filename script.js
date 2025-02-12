const apiUrl = 'https://www.dnd5eapi.co';

const fetchData = async (url) => {
  const response = await fetch(apiUrl + url);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return document.querySelector('#root').innerHTML = '<h1>ERROR AT DOWNLOADING DATA</h1>';
  }
}

const getMonstersData = async (array, count) => {
  const fetchArray = array.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex < count) {
      return [...accumulator, fetchData(currentValue.url)]
    } else {
      return accumulator;
    }
  }, [])

  return Promise.all(fetchArray);
}

const header = () => `
  <header>
    <div class="logo">logo</div>

    <button class="menu"></button>
    <nav>
      <button>Home</button>
      <button>About</button>
      <button>Contact</button>
      <button>Kismacska</button>
      <button>Codecool</button>
    </nav>
  </header>
`

const card = (monsterData, index) => `
  <div class="card">
    <h3>#${index + 1}</h3>
    <h2>${monsterData.name}</h2>
    <img src=${monsterData.image ? apiUrl + monsterData.image : 'https://lukacs-general.hu/wp-content/uploads/2018/01/placeholder.png'} />
    <p>${monsterData.languages}</p>
    <div class="stats">
      <span stat-name="intelligence">${monsterData.intelligence}</span>
      <span stat-name="strength">${monsterData.strength}</span>
      <span stat-name="charisma">${monsterData.charisma}</span>
      <span stat-name="dexterity">${monsterData.dexterity}</span>
      <span stat-name="wisdom">${monsterData.wisdom}</span>
      <span stat-name="constitution">${monsterData.constitution}</span>
    </div>
  </div>
`;

const monsterCards = (monstersData) => monstersData.map((monsterData, index) => card(monsterData, index)).join("");

const loading = () => `
  <div class="loading-container">
    <div class="loading">
      <div class="circle"></div>
      <div class="circle"></div>
    </div>

    <div class="loading-2">
      <div class="circle"></div>
      <div class="circle"></div>
    </div>

    <h2>loading</h2>
  </div>
`;

const createMenuButtonClickEvent = () => document.querySelector('button.menu').addEventListener('click', (event) => event.target.classList.toggle('open'));

const init = async () => {
  const rootElement = document.querySelector("#root");
  rootElement.insertAdjacentHTML('beforeend', header());
  createMenuButtonClickEvent();

  rootElement.insertAdjacentHTML('beforeend', loading());

  const { results } = await fetchData('/api/monsters');
  const monstersData = await getMonstersData(results, 100);
  console.log(monstersData);

  document.querySelector('.loading-container').remove();
  rootElement.insertAdjacentHTML("beforeend", monsterCards(monstersData));
}

const loadEvent = async () => {
  init();
}

window.addEventListener('load', loadEvent);