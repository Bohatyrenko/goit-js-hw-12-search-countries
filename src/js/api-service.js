const BASE_URL = 'https://restcountries.eu/rest/v2/name';
function fetchCountry(countryName) {
  return fetch(`${BASE_URL}/${countryName}`).then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

export default { fetchCountry };
