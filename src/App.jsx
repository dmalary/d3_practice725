// import { useState } from 'react'
import './App.css'

import data from '../market.json'
import AxesX from './components/AxesX'
import AxesY from './components/AxesY'

function App() {

  const specs = {
    width: 800,
    height: 500
  }

  return (
    <>
    <svg width={specs.width} height={specs.height}>
      <path 
        stroke="currentColor"
      />
      <AxesX data={data} width={specs.width} height={specs.height}/>
      <AxesY data={data} width={specs.width} height={specs.height}/>
      </svg>
    </>
  )
}

export default App
