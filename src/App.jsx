// import { useState } from 'react'
import './App.css'

import data from '../market.json'
import AxesX from './components/AxesX'
import AxesY from './components/AxesY'
import LineChart from './components/LineChart'

function App() {

  const specs = {
    width: 800,
    height: 500
  }

  console.log('data', data)
  console.log('data', data.history.filter(el => el.ticker === "AAPL"))

  const stockColorCat = {
    AAPL: '#1F77B4', //aapl
    GOOGL: '#9467BD', // googl
    FB: '#FF7F0E', // fb
    MSFT: '#8C564B', // msft
  }

  const filteredData = (stockKey) => ({
    ...data,
    history: data.history.filter(el => el.ticker === stockKey),
    stockColor: stockColorCat[stockKey]
  })


  return (
    <>
    <svg width={specs.width} height={specs.height}>
      {/* <path 
        stroke="currentColor"
      /> */}
      <AxesX data={data} width={specs.width - 20} height={specs.height - 20}/>
      <AxesY data={data} width={specs.width - 20} height={specs.height - 20}/>
      {/* for each data.stocks map through history as LineChart */}
      {/* <LineChart data={filteredData("AAPL")} width={specs.width - 20} height={specs.height - 20}/> */}
      {data.stocks.map(stock => {
        // console.log('filtered', filteredData(stock)),
        const stockData = filteredData(stock.ticker);
        console.log('stockData', stockData)
        return (
        <LineChart 
          key={stock.ticker}
          data={stockData} 
          width={specs.width - 20} 
          height={specs.height - 20}
          strokeColor={stockData.stockColor}
        />
        )
      })}
      </svg>
    </>
  )
}

export default App
