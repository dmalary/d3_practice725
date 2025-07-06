import { useMemo } from 'react';
import * as d3 from 'd3'

export default function LineChart({data, height, width, strokeColor, ticker, isSelected}) {
    // console.log('isSelected', isSelected)
    // console.log('ticker', ticker)

    const isActive = isSelected.includes(ticker);

    const pathD = useMemo(() => {
      if (!data || !data.history) return [];

      const tradeOpen = data.timestamp;
      const tradeClose = +data.timestamp + (6.5 * 60 * 60 * 1000);
  
      const xScale = d3.scaleUtc()
        .domain([tradeOpen, tradeClose])
        .range([0, width - 90])
  
      // Get the full price range across all tickers
      const prices = data.history.map(d => d.price);
      const yDomain = d3.extent(prices); // [min, max]
  
      const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([height - 40, 0]) // leave bottom margin
        
      const lineGen = d3.line()
        .x(d => xScale(d.timestamp))
        .y(d => yScale(d.price))
        .curve(d3.curveMonotoneX); // optional: smoother line
  
      return lineGen(data.history)
    }, [data, height, width]);

  return (
    <>
      {isSelected.length === 0 || isActive ?
        <path
          fill='none'
          stroke={strokeColor}
          strokeWidth={2}
          d={pathD}
          transform="translate(50, 20)"
        /> : null
      }
    </>
  )
}