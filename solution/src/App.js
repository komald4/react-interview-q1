import './App.css';
import {useState, useEffect} from "react";
import {getLocations} from "./mock-api/apis";

function App() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(null);

  const [countryChoices, setcountryChoices] = useState([]);

  const [error, setError] = useState(null);

  const [tableData, setTableData] = useState([]);

  const fetchCountries = async () => {
    try {
      const countries = await getLocations();
      setcountryChoices(countries);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  useEffect(() => {
    setCountry(countryChoices[0]);
  }, [countryChoices])

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  }

  const handleClearInputs = () => {
    setName("");
    setCountry(countryChoices[0]);
  }

  const handleAdd = () => {
    if(!name) {
      setError('Name is empty');
      return;
    }
    if(tableData.map(({name}) => name).includes(name)) {
      setError('This name has already been taken');
      return;
    }
    setError(null);

    setTableData([...tableData, {name, country}]);
    handleClearInputs();
  }
  
  return (
    <div className="App">
        <div className='flex my-16'>
        <div className='input-label'>Name</div>
        <div className='flex-1'>
          <input className='input' value={name} onChange={handleChangeName} />
          {!!error && <div className='error-message'>{error}</div>}
        </div>
      </div>
      <div className='flex my-16'>
        <div className='input-label'>Country</div>
        <div className='flex-1'>
          <select className='input' value={country} onChange={handleChangeCountry}>
            {countryChoices.map((choice) => (
              <choice key={choice} value={choice}>{choice}</choice>
            ))}
          </select>
        </div>
      </div>
      <div className='flex flex-right my-16'>
        <button onClick={handleClearInputs}>Clear</button>
        <button onClick={handleAdd}>Add</button>
      </div>
      <table className='my-16'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Country</td>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, i) => (
            <tr key={i} className={i % 2 ? 'tr-dark' : 'tr-light'}>
              <td>{item.name}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
