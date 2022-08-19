import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

// QuerySelectors
const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

// Listening for the input
const DEBOUNCE_DELAY = 300;
searchBox.addEventListener("input", debounce(searching, DEBOUNCE_DELAY));

// Functions
function searching() {

  fetchCountries(searchBox.value.trim())
    .then(countries => renderCountriesInfo(countries))
    .catch(error => {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      console.log(error);

      if (searchBox.value !== "") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      };
    }
    );
};


function renderCountriesInfo(countries) {

  if (countries.length > 10) {

    countryList.innerHTML = "";
    countryInfo.innerHTML = "";

    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

  } else if (countries.length > 1 && countries.length <= 10) {

    countryInfo.innerHTML = "";

    const markup = countries
      .map((country) => {
        return `<li class="country-list__item">
      <img class="country-list__item-flag" src="${country.flags.svg}" alt="The flag of ${country.name.common}">
      <p country-list__item-text> ${country.name.common}</p>
      </li>`;
      })
      .join("");

    countryList.innerHTML = markup;

  } else if (countries.length === 1) {

    countryList.innerHTML = "";

    const countryInfoMarkup = countries.map((country) => {
      return `<div class="country-info__heading">
      <img class="country-info__flag" src="${country.flags.svg}" alt="The flag of ${country.name.common}"><h2>
       ${country.name.common}<h2></div>
      <p class="country-info__item"><span class="country-info__label">Capital:</span> ${country.capital}</p>
      <p class="country-info__item"><span class="country-info__label">Population:</span> ${country.population}</p>
      <p class="country-info__item"><span class="country-info__label">Languages:</span> ${Object.values(country.languages).join(", ")}</p>`;
    });

    countryInfo.innerHTML = countryInfoMarkup;

  } else {

    countryList.innerHTML = "";
    countryInfo.innerHTML = "";

  };
};
