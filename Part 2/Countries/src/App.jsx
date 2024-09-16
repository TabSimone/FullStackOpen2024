import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState('');
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [isVisibleMany, setIsVisibleMany] = useState(false);
  const [isVisibleFiltered, setIsVisibleFiltered] = useState(false);
  const [isVisibleSingle, setIsVisibleSingle] = useState(false);
  const [singleCountry, setSingleCountry] = useState({});

  // Fetch all countries on mount
  useEffect(() => {
    console.log('Fetching countries...');
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data);
        console.log('Countries fetched!');
      })
      .catch(error => {
        console.log('There has been an error', error);
      });
  }, []); // Empty dependency array to run once on mount

  // Function to fetch a single country
  const fetchSingleCountry = (name) => {
    fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setSingleCountry(data)
        setIsVisibleSingle(true)
      })
      .catch(error => {
        console.error('Problem fetching a single country:', error);
      });
  };

  // Handle search input
  const onSearch = (event) => {
    event.preventDefault();
    const inputValue = event.target.value; // Get the current input value
    setValue(inputValue); // Update state with the current input value

    // Filter countries based on the current input value
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    // Update visibility based on the number of filtered countries
    if (filteredCountries.length > 10) {
      setIsVisibleMany(true);
      setIsVisibleFiltered(false);
      setIsVisibleSingle(false);
    } else if (filteredCountries.length === 1) {
      console.log('I have only one country in the list');
      fetchSingleCountry(filteredCountries[0].name.common); // Fetch single country data
      setIsVisibleMany(false);
      setIsVisibleFiltered(false);
    } else {
      setCountriesFiltered(filteredCountries);
      setIsVisibleMany(false);
      setIsVisibleFiltered(true);
      setIsVisibleSingle(false);
    }
  };

  return (
    <div>
      country: <input value={value} onChange={onSearch} />
      {isVisibleMany && <p>Too many countries!</p>}
      {isVisibleFiltered && (
        <ul>
          {countriesFiltered.map((country) => (
            <div>
              <li key={country.name.common}>{country.name.common}</li>
              <button onClick={() => { fetchSingleCountry(country.name.common) }}> show </button>
            </div>
          ))}
        </ul>
      )}



      {isVisibleSingle && (
        <div>
          <h2>Country Details:</h2>
          <p><strong>Name:</strong> {singleCountry.name.common}</p>
          <p><strong>Capital:</strong> {singleCountry.capital ? singleCountry.capital[0] : 'N/A'}</p>
          <p><strong>Population:</strong> {singleCountry.population.toLocaleString()}</p>
          <p><strong>Area:</strong> {singleCountry.area} km²</p>
          <p><strong>Languages:</strong> {Object.values(singleCountry.languages).join(', ')}</p>
          <img src={singleCountry.flags.png} alt={`Flag of ${singleCountry.name.common}`} style={{ width: '150px' }} />
        </div>
      )}
    </div>
  );
};

export default App;