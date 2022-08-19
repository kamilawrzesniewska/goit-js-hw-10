import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const form = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

form.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchQuery = event.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (searchQuery !== '') {
    API.fetchCountries(searchQuery).then(renderCountry).catch(onFetchError);
  }
}

function renderCountry(countries) {
  if (countries.length > 10) {
    ifManyFound();
  }
  if (countries.length > 1 && countries.length <= 10) {
    ifSomeCountries(countries);
  }
  if (countries.length === 1) {
    ifOnlyOneCountry(countries);
  }
}

function ifManyFound() {
  Notify.failure(`Too many matches found. Please enter a more specific name.`);
}
function ifSomeCountries(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
       <li><p><img style="width: 30px; margin-right: 20px" src="${flags.svg}">${name.official}</p></li>    
               `;
    })
    .join('');

  countryList.insertAdjacentHTML('beforeend', markup);
}
function ifOnlyOneCountry(countries) {
  const info = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
  <h1><img style="width: 30px; margin-right: 20px" src="${flags.svg}">${name.official}</h1>
  <p><span>Capital: </span>${capital}</p>
  <p><span>Population: </span>${population}</p>
  <p><span>Languages: </span>${Object.values(languages)}</p>
        `;
    })
    .join('');

  countryInfo.insertAdjacentHTML('beforeend', info);
}

function onFetchError(error) {
    Notify.warning('Oops, there is no country with that name');
    console.log(error);
}

