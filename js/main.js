const container = document.querySelector('.container-card');
const inputCity = document.querySelector('.inputCity');
const body = document.querySelector('body');

inputCity.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    render(e.target.value);
    inputCity.disabled = true;
    inputCity.value = 'Buscando...';
    setTimeout(() => {
      inputCity.disabled = false;
      inputCity.value = '';
    }, 1000);
  }
});

const clima = {
  Clouds: {
    gif: 'https://i.gifer.com/1Unb.gif',
    bg: '../img/primero-min.jpg',
  },
  Rain: {
    gif: 'https://i.gifer.com/7hi3.gif',
    bg: '../img/segundo-min.jpg',
  },
  Snow: {
    gif: 'https://i.gifer.com/55Cz.gif',
    bg: '../img/tercero-min.jpg',
  },
  Drizzle: {
    gif: 'https://64.media.tumblr.com/9c74d088642998035c3348045bf801dc/tumblr_n8mv2t0K8I1rjje1fo1_500.gifv',
    bg: '../img/cuarto-min.jpg',
  },
  Clear: {
    gif: 'https://i.gifer.com/XFbw.gif',
    bg: '../img/quito-min.jpg',
  },
  Thunderstorm: {
    gif: 'https://i.gifer.com/7TDT.gif',
    bg: '../img/sexto-min.jpg',
  },
  Mist: {
    gif: 'https://i.gifer.com/5yp.gif',
    bg: '../img/septimo-min.jpg',
  },
};

const getLocation = async () => {
  let url = 'https://ipinfo.io/json?token=ada65ee9ca7df1';
  let response = await axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.message);
    });
  console.log('aca toy', response);
  return response.city;
};
const getWeather = async (city) => {
  const cityRes = city ? city : await getLocation();
  API_KEY = 'e8d8e36405e49666a199b1545524fbe5';
  res = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityRes}&lang=es&appid=${API_KEY}&units=metric`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.message);
    });
  return res;
};

const error = (d) => {
  if (d === undefined) {
    inputCity.disabled = false;
    inputCity.value = '';
    inputCity.focus();
    alert('No se encontro la ciudad o pais');
    return;
  }
};

const render = async (city) => {
  const weather = await getWeather(city);
  console.log(weather);
  error(weather);
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
