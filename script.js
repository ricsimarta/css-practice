
const loadEvent = async () => {
  const rootElement = document.querySelector("#root");
  console.log(rootElement);

  const response = await fetch('https://www.dnd5eapi.co/api/monsters');
  console.log(response);
  const data = await response.json();
  console.log(data);
}

window.addEventListener('load', loadEvent);