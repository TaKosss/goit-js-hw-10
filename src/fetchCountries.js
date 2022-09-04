const BASE_URL = 'https://restcountries.com/v3.1'

export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?fields=flags,name,capital,population,languages`)
        .then(r => {
            if (!r.ok) {
                if (r.status === 404) {
                    return[]
                }
                throw new Error(r.status)
            }
            return r.json()
        }
    )
} 

