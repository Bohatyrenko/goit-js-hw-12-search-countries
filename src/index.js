import '../src/styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import countryTmp from '../src/templates/country-card.hbs';
import listCountryTmp from '../src/templates/list-country.hbs';
import API from '../src/js/api-service';
import getRefs from '../src/js/get-refs';
import debounce from 'lodash.debounce';

const refs = getRefs();

refs.input.addEventListener(
  'input',
  debounce(e => onSearch(e.target.value), 500),
);

function onSearch(countryName) {
  API.fetchCountry(countryName)
    .then(renderCountryCard)
    .catch(() =>
      error({
        title: 'Uh Oh!',
        delay: 2000,
        text: 'Nothing found!',
      }),
    );
}

function renderCountryCard(data) {
  refs.cardContainer.innerHTML = '';
  if (data.length === 1) {
    const markup = countryTmp(data);
    refs.cardContainer.innerHTML = markup;
  }
  if (data.length > 1 && data.length <= 10) {
    const markup = listCountryTmp(data);
    refs.cardContainer.innerHTML = markup;
  }
  if (data.length > 10) {
    error({
      title: 'Uh Oh!',
      delay: 2000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}
