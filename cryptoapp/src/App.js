import React, { useState, useEffect } from 'react';
import "./App.css";


const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets');
        const data = await response.json();
        setCoins(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []); 

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Cryptocurrency Prices</h1>
      <input type="text" placeholder="Search" onChange={handleChange} />
      {filteredCoins.map(coin => (
        <div key={coin.id}>
          <h2>{coin.name}</h2>
          <p>Symbol: {coin.symbol}</p>
          <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
