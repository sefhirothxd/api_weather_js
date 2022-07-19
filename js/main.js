const container = document.querySelector('.container-card');
const inputCity = document.querySelector('.inputCity');
const body = document.querySelector('body');

inputCity.addEventListener('change', (e) => {
  getWeatherByCity(e.target.value);
  inputCity.disabled = true;
  inputCity.value = 'Buscando...';
  setTimeout(() => {
    inputCity.disabled = false;
    inputCity.value = '';
  }, 3000);
});

const clima = {
  Clouds: {
    gif: 'https://i.gifer.com/1Unb.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/resized/dia-nublado-en-el-bosque-9096.jpg?s=large',
  },
  Rain: {
    gif: 'https://i.gifer.com/7hi3.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/hojas-de-otono-con-gotas-de-lluvia-6565.jpg',
  },
  Snow: {
    gif: 'https://i.gifer.com/55Cz.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/pinos-nevados-10309.jpg',
  },
  Drizzle: {
    gif: 'https://i.gifer.com/7sd0.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/carretera-de-anochecer-nubes-y-bosque-3040.jpg',
  },
  Clear: {
    gif: 'https://i.gifer.com/XFbw.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/montana-en-las-nubes-al-atardecer-5383.jpg',
  },
  Thunderstorm: {
    gif: 'https://i.gifer.com/7TDT.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/rayos-en-cielo-nublado-4088.jpg',
  },
  Mist: {
    gif: 'https://i.gifer.com/5yp.gif',
    bg: 'https://www.xtrafondos.com/wallpapers/bosque-con-niebla-6701.jpg',
  },
};

const getWeatherByCity = async (city) => {
  const weather = await axios.get(
    `https://api.api-ninjas.com/v1/city?name=${city}`,
    {
      headers: {
        'X-Api-Key': 'Jt1ttjmMBEGF/A8O764T9Q==oHGuAaiDgSEiYvql',
      },
    }
  );
  console.log(weather.data[0]?.name);
  if (weather.data[0]?.name !== undefined) {
    render(weather.data[0].name);
  } else {
    alert('La ciudad no esta disponible');
  }
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
  body.style.backgroundImage = `url(${clima[weather.weather[0].main].bg})`;
  container.innerHTML = `
  <div class="card">
    <div class="card-image">
      <img class="card-image--background" src=${
        clima[weather.weather[0].main].gif
      } alt="gif image">
      <img class="card-image--icon"  src="http://openweathermap.org/img/wn/${
        weather.weather[0].icon == '01n' ? '01d' : weather.weather[0].icon
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
render();
