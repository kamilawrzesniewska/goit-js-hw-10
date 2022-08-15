import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const renderInfo = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.png}" alt="${name.official}" width="200" height="200">
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`,
  );
};

const renderList = data => {
  return data.map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="50" height="30">${name.official}</li>`,
    )
    .join('');
};

input.addEventListener('input', debounce(userValue,DEBOUNCE_DELAY));

const userValue = e => {
  const trimInput = e.target.value.trim();

  if (trimInput != '') {
    fetchCountries(trimInput)
      .then(response => {
        if (response.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
        }
        if (response.length >= 2 && response.length <= 10) {
          countryInfo.innerHTML = '';
          renderList(countries);
        }

        if (response.length === 1) {
          countryList.innerHTML = '';
          renderInfo(countries);
        }
      })
      .catch(error => {
        console.log(error);
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      });
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }

};


