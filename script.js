
const loadEvent = async () => {
  const rootElement = document.querySelector("#root");
  /* rootElement.insertAdjacentHTML("beforeend", `
    <header>
      <button>Home</button>
      <button>Monsters</button>
      <button>Abilites</button>
    </header>
  `); */

  const apiUrl = 'https://www.dnd5eapi.co';

  const response = await fetch(apiUrl + '/api/monsters');
  const data = await response.json();
  const { results } = data;

  /* const [first, second, third, fourth, fifth, ...rest] = results;
  const monstersData = [first, second, third, fourth, fifth];
  console.log(monstersData);
  console.log(rest); */

  for (let i = 0; i < 30; i++) {
    const element = results[i];

    const monsterResponse = await fetch(apiUrl + element.url);
    const monsterData = await monsterResponse.json();
    console.log(monsterData);

    const monsterCardHtml = `
      <div class="card">
        <h3>#${i + 1}</h3>
        <h2>${monsterData.name}</h2>
        <img src=${apiUrl + monsterData.image} />
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

    rootElement.insertAdjacentHTML('beforeend', monsterCardHtml);
  }
}

window.addEventListener('load', loadEvent);