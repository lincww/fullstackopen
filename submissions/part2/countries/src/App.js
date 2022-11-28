import {useEffect, useState} from "react";
import axios from "axios";
import _ from 'lodash'

const SearchBar = ({searchFilter, setSearchFilter}) => {
  const handleSearchFilterChange = (event) => setSearchFilter(event.target.value)
  return (
    <div>
      find countries &nbsp; <input value={searchFilter} onChange={handleSearchFilterChange}/>
    </div>
  )
}

const Weather = ({country}) => {
  const weatherAPIKey = process.env.REACT_APP_API_KEY
  const [weatherInfo, setWeatherInfo] = useState({})
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&limit=5&appid=${weatherAPIKey}&units=metric`)
      .then((resp) => {
        setWeatherInfo(resp.data)
      })
  }, [country.capital, weatherAPIKey])
  if (!_.isEmpty(weatherInfo)) {
    return (
      <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>temperature {weatherInfo.main.temp} Celcius</p>
        <img src={"http://openweathermap.org/img/wn/"+weatherInfo.weather[0].icon + "@2x.png"} alt="Weather"/>
        <p>wind {weatherInfo.wind.speed} m/s</p>
      </div>
    )
  }
}

const Country = ({country}) => {
  if (_.isEmpty(country)) {
    return
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <div>
        <h3>languages</h3>
        <ul>
          {Object.keys(country.languages).map(language => <li
            key={country.language}>{country.languages[language]}</li>)}
        </ul>
      </div>
      <img src={country.flags.png} alt="Flag"/>
      <Weather country={country}/>
    </div>
  )
}

const Countries = ({countries, searchFilter, setShownCountry}) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(searchFilter) !== -1)

  if (filteredCountries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } else if (filteredCountries.length === 0) {
    return (<p>No Country Named this. Please specify another filter.</p>)
  } else if (filteredCountries.length >= 2) {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.cca2}>
            <p>{country.name.common}
              <button onClick={() => {
                setShownCountry(country)
              }}>show
              </button>
            </p>
          </div>
        ))}

      </div>
    )
  } else {
    setShownCountry(filteredCountries[0])
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [shownCountry, setShownCountry] = useState({})
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(resp => {
      setCountries(resp.data)
    })
  }, [])

  return (
    <div>
      <SearchBar searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
      <Countries countries={countries} searchFilter={searchFilter} setShownCountry={setShownCountry}/>
      <Country country={shownCountry}/>
    </div>
  )
}

export default App