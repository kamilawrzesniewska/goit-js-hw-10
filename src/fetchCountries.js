function fetchCountries(name) {
    const query = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages` 
    
    return fetch(query).then(response => {
        if (!response.ok) {
            throw new Error(response.status)
        }
        return response.json();
    })
}
export default fetchCountries