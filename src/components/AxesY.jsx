import { useMemo } from 'react';
import * as d3 from 'd3'

export default function AxesY({width, height, data}) {
  //   const ticks = useMemo(() => {
  //   if (!data || !data.history) return [];

  //   // Get the full price range across all tickers
  //   const prices = data.history.map(d => d.price);
  //   const yDomain = d3.extent(prices); // [min, max]

  //   // update to reflect percent change (vs price)
  //   // Intraday **change** chart showing percent change for every timestamp relative to the start of the day: `F(t) = (P(t) - P(0))/P(0) * 100%`

  //   const yScale = d3.scaleLinear()
  //     .domain(yDomain)
  //     .range([height - 40, 0]) // leave bottom margin

  //   return yScale.ticks(5).map(val => ({
  //     val,
  //     yOffset: yScale(val)
  //   }));
  // }, [data, height]);

  const ticks = useMemo(() => {
    if (!data || !data.history) return [];

    const startPrice = data.history[0].price;

    const percentChanges = data.history.map(d => ((d.price - startPrice) / startPrice) * 100);

    const yDomain = d3.extent(percentChanges);

    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([height - 40, 0]);

    return yScale.ticks(4)
      .map(val => ({
        val,
        yOffset: yScale(val)
      }))

  }, [data, height]);

  return (
    <>
      {ticks.map(({val, yOffset}, i) => (
        // i > 0 ?
        // console.log('val', val),
        <g 
          className="y-axis-grid"
          key={val.toString()} 
          transform={`translate(40, ${yOffset})`}
          >
          {val === 0 ?
            <line 
              x2={width - 50} 
              stroke="#000000" 
              strokeWidth={1.5}
              />
            : 
            <line 
              x2={width - 50} 
              stroke="#888888" />
          }
          <text
            x={width - 10}
            dy="0.32em"
            textAnchor="end"
            fontSize={16 * 1.1}
            fill="#666"
          >
            {val.toFixed(2)}
          </text>
        </g> 
        // : null
      ))}
    </>
  )
}