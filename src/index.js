import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';


const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector("#search-box");
const countryListEl = document.querySelector(".country-list");
const countryCardEl = document.querySelector(".country-info");


inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(event) {
    const name = event.target.value.trim();
    
    if (!name) {
        countryCardEl.innerHTML = '';
        countryListEl.innerHTML = "";
    }

    fetchCountries(name).then(countries => {
        if (countries.length === 1) {
            countryListEl.innerHTML = "";
            countryCardEl.innerHTML = createCountryCard(countries);
            
        }
        else if (countries.length >= 2 && countries.length <= 10) {
            countryCardEl.innerHTML = '';
            countryListEl.innerHTML = createCountriesList(countries);
        }
        else {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
    })
    .catch (() => Notiflix.Notify.failure('Oops, there is no country with that name'))   
}
    
function createCountriesList(countries) {
    return countries.map(({ flags, name }) =>
    `<li>
      <img src="${flags.svg}" alt="flag of ${name.official}" width = 30px; height = 15px;>
        <span><b>${name.official}</b></span>
    </li>`)
    .join('');
}
  
function createCountryCard(countries) {
  return countries.map(({ name, capital, population, flags, languages }) =>
`
  <ul>
  <img src="${flags.svg}" alt="flag of ${name.official}" width = 100px; height = 50px;>
  <span class="countryName"><b>${name.official}</b></span>
  <li><span><b>Capital:</b></span> <span>${capital}</span></li>
  <li><span><b>Population:</b></span> <span>${population}</span></li>
  <li><span><b>Languages:</b></span><span>${Object.values(languages)}</span></li></ul>
  `
  ).join('');
}
