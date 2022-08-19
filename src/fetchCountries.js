function fetchCountries(name) {

    const filters = "name,capital,population,flags,languages"
  
    const fetchQuery =
      fetch(`https://restcountries.com/v3.1/name/${name}?fields=${filters}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      });
  
    return fetchQuery;
  }
  export { fetchCountries };




