import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      <form>
        <div>find countries <input onChange={props.handleFilter} /></div>
      </form>
    </div>
  )
}

const Countries = (props) => {
  const countriesToShow = props.newFilter
    ? props.countries.filter((country) => country.name.common.toLowerCase().includes(props.newFilter.toLowerCase()))
    : props.countries
    
    if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (countriesToShow.length === 1) {
      return (
        <div>
          {countriesToShow.map((country) =>
            <div key={country.name.common}> 
              <h1 key={country.name.common}>{country.name.common}</h1>            
              <div>Capital {country.capital}</div>
              <div>Area {country.area}</div>
              <h2>Languages</h2>
              <ul>
                {Object.keys(country.languages).map(i => (
                  <li key={i}>{country.languages[i]}</li>
                ))}
              </ul>
              <img src={country.flags.png}/>
            </div>
          )}
        </div>
      )
    } else if (countriesToShow.length === 0) {
      return (
        <div>No results</div>
      )
    } else {
      console.log(countriesToShow)
      return (
        <div>
          {countriesToShow.map((country) => 
            <div key={country.name.common}>
              {country.name.common}
            </div>
          )}
        </div>
      )
    }
}

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(countries.concat(response.data))
      })
  }, [])

  const handleFilter = (event) =>  {
    setFilter(event.target.value)
  }

  return (
      <div>
        <Filter handleFilter={handleFilter}/>
        <Countries countries={countries} newFilter={newFilter}/>
      </div>
  )
}

export default App
