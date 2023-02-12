import './App.css';
import currencies from './currencies'
import React, { useEffect, useState } from 'react';

function App() {

  const [fromName, setFromName] = useState('USD')
  const [toName, setToName] = useState('MAD')
  const [fromFlag, setFromFlag] = useState('us')
  const [toFlag, setToFlag] = useState('ma')
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('')

  const options = currencies.map((currency) => (
      <option>{currency.name}</option>
  ));

  const changeCurrency = (event, changeName, changeFlag) => {
    const currencyName = event.target.value;
    changeName(currencyName)
    const currency = currencies.find(c => c.name === currencyName)
    changeFlag(currency.flag.toLowerCase())
  }

  const getExchangeRate = (event) => {
    event.preventDefault()
    if (amount <= 0) {
      setResult('Please set some Amount!')
    } else {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromName}`)
      .then(response => response.json())
      .then(data => {
          const output = parseFloat(data.rates[toName] * amount).toFixed(2)
          setResult(`${amount} ${fromName} = ${output} ${toName}`)
      })
    }
  }

  return (
    <div className="wrapper">
      <header>Zakareea</header>
      <form action="#">
        <div className="amount">
          <p>Enter Amount</p>
          <input type="number" onInput={e => setAmount(e.target.value)}></input>
        </div>
        <div className="drop-list">
          <div className="from">
            <p>From</p>
            <div className="select-box">
              <img src={`https://flagcdn.com/48x36/${fromFlag}.png`} alt="flag"></img>
              <select value={fromName} onChange={(event) => changeCurrency(event, setFromName, setFromFlag)}>{options}</select>
            </div>
          </div>
          <div className="icon"><i className="fas fa-exchange-alt"></i></div>
          <div className="to">
            <p>To</p>
            <div className="select-box">
              <img src={`https://flagcdn.com/48x36/${toFlag}.png`} alt="flag"></img>
              <select value={toName} onChange={(event) => changeCurrency(event, setToName, setToFlag)}>{options}</select>
            </div>
          </div>
        </div>
        <div className="exchange-rate">{result}</div>
        <button onClick={getExchangeRate} className="exchange-rate">Get Exchange Rate</button>
      </form>
    </div>
  );
}

export default App;
