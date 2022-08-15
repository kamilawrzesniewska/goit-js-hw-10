import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const countrySearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countrySearch.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(event) {
  let value = event.target.value.trim();

  if (value != '') {
    fetchCountries(value)
      .then(response => {
        if (response.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
        }
        if (response.length >= 2 && response.length <= 10) {
          countryInfo.innerHTML = markup(response);
          countryList.innerHTML = '';
        }

        if (response.length === 1) {
          countryInfo.innerHTML = markupCountry(response);
          countryList.innerHTML = '';
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
}

function markup(array) {
  return array
    .map(
      element =>
        `<li class="list-item"><img class="img" src="${element.flags.svg}" alt="${element.name.official}"></img><p>${element.name.official}</p></li>`
    )
    .join('');
}

function markupCountry(argCountry) {
  const [country] = argCountry;
  const { name, population, flags, capital, languages } = country;
  const languageArray = Object.values(languages);

  return `<div class="wrapper"><img class="img" src="${flags.svg}" alt="${
    name.official
  }"></img>
          <h2 class="countryName">${name.official}</h2></div>
    <ul class="country-list">
    <li class="list-item"><p><b>Capital: </b>${capital}</p></li>
    <li class="list-item"><p><b>Population: </b>${population}</p></li>
    <li class="list-item"><p><b>Languages: </b>${languageArray.join(
      ', '
    )}</p></li>
    </ul>`;
}
