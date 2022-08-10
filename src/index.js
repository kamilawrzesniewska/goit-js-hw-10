
import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const makeList = document.querySelector(".country-list")
const markupSingle = document.querySelector("#search-box")
const makeInfo = document.querySelector(".country-info")


markupSingle.addEventListener('input', debounce(onInputCheck, 300))

function onInputCheck(input) {
    const nameCountry = input.target.value.trim(); 
    makeList.innerHTML = "";
    makeInfo.innerHTML = "";
   
    if (nameCountry) {
        
        fetchCountries(nameCountry)
            .then(handleData).catch(err => {
                console.log(err)
                Notify.failure("Oops, there is no country with that name")
            })
    }
}

function handleData(data) {
    if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        return
    }
    if (data.length > 1) {
        createList(data) 
    } else {
        createInfo(data)
    }
}

function createList(data) {
    const list = data.map(({name, flags}) => `<li class="country">
                <img alt = "${name.common} flag" src = "${flags.svg}" width="50">
                <span>${name.common}</span>
            </li>`)
    makeList.innerHTML = list.join("")
}

function createInfo(data) {
    const { flags, name, capital, population, languages } = data[0]; 
    const langs = Object.values(languages).join(", "); 
    const info = `<img src = '${flags.svg}' width = "100"><p>${name.official}</p>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${langs}`
    makeInfo.innerHTML = info; 
}
