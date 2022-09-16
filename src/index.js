import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries'
 
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault()
    const searchBox = e.target.value.trim()
    if ( !searchBox ) {
        cleanHtml()
    }
   fetchCountries(searchBox)
    .then(renderCountryCard)
    .catch(onCatchError)
}

function renderCountryCard(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountryList(countries)
    } else if (countries.length === 1) {
        renderOneCountry(countries)
    }
}

function renderCountryList(countries) {
    const markup = countries
        .map(({ flags, name}) => {
            return `<div class="country__container"><img src="${flags.svg}" alt="Flag ${name.official}" width="30" height="20">
                    <p><b>${name.official}</b></p>
                    </div>`
        }).join('')
    refs.countryList.innerHTML = markup
}

function renderOneCountry(countries) {
    const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
            return `<div class="country__container"><img src="${flags.svg}" width="30" height="20" >
                    <p class="country__name"><b>${name.official}</b></p></div>
                    <p><b>Capital:</b> ${capital}</p>
                    <p><b>Population:</b> ${population}</p>
                    <p><b>Languages:</b> ${Object.values(languages)
                    .map(language => `${language}`).join(', ')}</p>`
        }).join('')
    refs.countryList.innerHTML = markup
}

function onCatchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}

function cleanHtml() {
    refs.countryList.innerHTML = ''
    refs.countryInfo.innerHTML = ''
}