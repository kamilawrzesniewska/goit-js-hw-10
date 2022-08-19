import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';


const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

function startData() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}


const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function renderInfo (country) {
  const markupInfo = country
    .map(({ name, capital, population, flags, languages }) => {
      return `
  <h1><img style="width: 50px; margin-right: 30px" src="${flags.svg}">${name.official}</h1>
  <p><span>Capital: </span>${capital}</p>
  <p><span>Population: </span>${population}</p>
  <p><span>Languages: </span>${Object.values(languages)}</p>
        `;
    })
    .join('');

    countryInfo.innerHTML = renderInfo;
}

const inputValue = evt => {
  let { value } = evt.target;
  value = value.trim().toLowerCase();
  if (value) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

      fetchCountries(value).then(quantityСheck).catch((error) => {
          console.log('error', error) 
          Notify.failure('Oops, there is no country with that name');
      });
  }
   if (value === '') {
    countryInfo.innerHTML = '';
      countryList.innerHTML = '';
  }
}

function quantityСheck(data) {
  if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      return
  }
  if (data.length > 1) {
      renderCountryList(data)
  } else {
      renderContryInfo(data)
  }
 
}

function renderCountryList(countries) {
  const markup = countries
      .map((country) => {
          return `<li class='list-style'><p><img src="${country.flags.svg}" width = "20">  ${country.name.common}</p></li>`
      }).join('');
      countryList.innerHTML = markup;
}
