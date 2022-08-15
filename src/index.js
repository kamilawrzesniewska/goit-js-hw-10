import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countrySearch.addEventListener('input', debounce(inputValue, DEBOUNCE_DELAY));

function inputValue(event) {
  let value = event.target.value.trim();




