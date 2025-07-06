import { useState } from 'react'
import './App.css'

import data from '../market.json'
import AxesX from './components/AxesX'
import AxesY from './components/AxesY'
import LineChart from './components/LineChart'
import TickerTable from './components/TickerTable'

function App() {

  const [isSelected, setIsSelected] = useState([]);
  console.log('isSelected', isSelected)

  const handleSelect = (ticker) => {
    setIsSelected(prev =>
      prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker]
    );
  };

  const specs = {
    width: 800,
    height: 500
  };

  const stockColorCat = {
    AAPL: '#1F77B4',
    GOOGL: '#9467BD',
    FB: '#FF7F0E',
    MSFT: '#8C564B',
  };

  const filteredData = (stockKey) => ({
    ...data,
    history: data.history.filter(el => el.ticker === stockKey),
    stockColor: stockColorCat[stockKey]
  });

  return (
    <>
    <div className='chart-container'>
      <svg width={specs.width} height={specs.height}>
        <AxesX data={data} width={specs.width - 20} height={specs.height - 20}/>
        <AxesY data={data} width={specs.width - 20} height={specs.height - 20}/>
        {data.stocks.map(stock => {
          const stockData = filteredData(stock.ticker);
          // console.log('stockData', stockData)
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
      </div>
      <div className='ticker-table-container'>
          {data.stocks.map(stock => {
            const stockData = filteredData(stock.ticker);

            return (
              <TickerTable 
                key={stock.ticker}
                ticker={stock.ticker}
                data={stockData} 
                isSelected={isSelected}
                onClick={handleSelect}
              />
            )
          })}
      </div>
    </>
  )
}

export default App
