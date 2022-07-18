const container = document.querySelector('.container');
const countrySelector = document.querySelector('#country');
const citySelector = document.querySelector('#city');

const country = {
  Argentina: [
    'Buenos Aires',
    'Córdoba',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'San Juan',
  ],
  Brasil: ['Brasilia', 'Rio de Janeiro', 'Sao Paulo'],
  Chile: ['Santiago', 'Valdivia', 'Concepcion'],
  Colombia: ['Bogota', 'Cali', 'Medellin'],
  Ecuador: ['Quito', 'Guayaquil', 'Ambato'],
  Guatemala: ['Guatemala', 'Quetzaltenango', 'San Marcos'],
  Honduras: ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba'],
  México: ['Ciudad de México', 'Monterrey', 'Tijuana'],
  Nicaragua: ['Managua', 'Masaya', 'Chinandega'],
  Panamá: ['Panamá', 'Chitré', 'Veracruz'],
  Paraguay: ['Asunción', 'Ciudad del Este', 'San Lorenzo'],
  Perú: ['Lima', 'Arequipa', 'Cusco'],
};

const listCountries = () => {
  for (const c in country) {
    countrySelector.innerHTML += `<option value="${c}">${c}</option>`;
  }
};

countrySelector.addEventListener('change', (event) => {
  console.log(event.target.value);
  citySelector.innerHTML = '';
  citySelector.innerHTML += `<option value="">Seleccione una ciudad</option>`;
  for (const c of country[event.target.value]) {
    citySelector.innerHTML += `<option value="${c}">${c}</option>`;
  }
});

citySelector.addEventListener('change', (event) => {
  render(event.target.value);
});

const clima = {
  Clouds: 'https://i.gifer.com/1Unb.gif',
  Rain: 'https://i.gifer.com/7hi3.gif',
  Snow: 'https://i.gifer.com/55Cz.gif',
  Drizzle: 'https://i.gifer.com/7sd0.gif',
  Clear: 'https://i.gifer.com/XFbw.gif',
  Thunderstorm: 'https://i.gifer.com/7TDT.gif',
  Mist: 'https://i.gifer.com/5yp.gif',
};

const getLocation = async () => {
  let url = 'https://ipinfo.io/json?token=ada65ee9ca7df1';
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  return data.city;
};
const getWeather = async (city) => {
  const cityRes = city ? city : await getLocation();
  API_KEY = 'e8d8e36405e49666a199b1545524fbe5';
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityRes}&lang=es&appid=${API_KEY}&units=metric`
  );
  console.log(response.data);
  return response.data;
};

const render = async (city) => {
  const weather = await getWeather(city);
  container.innerHTML = `
  <div class="card">
    <div class="card-image">
      <img class="card-image--background" src=${
        clima[weather.weather[0].main]
      } alt="gif image">
      <img class="card-image--icon"  src="http://openweathermap.org/img/wn/${
        weather.weather[0].icon
      }@2x.png" alt="${weather.weather[0].description}">
    </div>
    <div class="card-content">
      <h3 class="card-title">${weather.weather[0].description}</h3>
      <p class="card-text">City: ${weather.name}</p>
      <p class="card-text">Temperature: ${weather.main.temp} °C</p>
      <p class="card-text">Speed Wind: ${weather.wind.speed} Km/h</p>
    </div>
</div>
`;
};
listCountries();
render();
