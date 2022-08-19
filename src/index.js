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

function onSearch(event) {
  const userValue = event.target.value.trim();
  if (!userValue) {
    clearCountryData();
    return;
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


function onFetchError(error) {
    Notify.warning('Oops, there is no country with that name');
    console.log(error);
}}
