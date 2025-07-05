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

  const filteredData = {
    ...data,
    history: data.history.filter(el => el.ticker === "AAPL")
  }

  return (
    <>
    <svg width={specs.width} height={specs.height}>
      {/* <path 
        stroke="currentColor"
      /> */}
      <AxesX data={data} width={specs.width - 20} height={specs.height - 20}/>
      <AxesY data={data} width={specs.width - 20} height={specs.height - 20}/>
      {/* for each data.stocks map through history as LineChart */}
      <LineChart data={filteredData} width={specs.width - 20} height={specs.height - 20}/>
      </svg>
    </>
  )
}

export default App
