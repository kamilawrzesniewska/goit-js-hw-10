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

function onInputCountry(event) {
  const inputValue = event.target.value.trim();

  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  if (!inputValue) {
      return;
  }

  fetchCountries(inputValue)
      .then(createCountries)
      .catch(error => {
          console.log('error', error);
          return Notify.failure('Oops, there is no country with that name');
      });
}
function createCountryList(data) {
  const countriesListMarkup = data
      .map(
          ({ flags, name }) => `
          <li class="country-list__item">
              <img class="country-img" src="${flags.svg}" width="40">
              <p>${name.official}</p>
          </li>
      `
      )
      .join('');
  countryList.innerHTML = countriesListMarkup;
}
function createCountries(data) {
  if (data.length >= 10) {
      return Notify.info(
          'Too many matches found. Please enter a more specific name.'
      );
  }

  if (data.length === 1) {
      return createCountryInfo(data);
  }
  createCountryList(data);
}
