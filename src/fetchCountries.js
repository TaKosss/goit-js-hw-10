const BASE_URL = 'https://restcountries.com/v3.1'

export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=flags,name,capital,population,languages`)
        .then(r => {
            if (!r.ok) {
                throw new Error(r.status)
            }
            return r.json()
        }
    )
} 

