import { useMemo } from 'react';
import * as d3 from 'd3'

export default function AxesY({width, height, data}) {
    const ticks = useMemo(() => {
    if (!data || !data.history) return [];

    // Get the full price range across all tickers
    const prices = data.history.map(d => d.price);
    const yDomain = d3.extent(prices); // [min, max]

    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([height - 40, 0]) // leave bottom margin

    return yScale.ticks(6).map(val => ({
      val,
      yOffset: yScale(val)
    }));
  }, [data, height]);

  return (
    <>
      {ticks.map(({val, yOffset}) => (
        <g 
          className="y-axis-grid"
          key={val.toString()} 
          transform={`translate(40, ${yOffset})`}
          >
          <line 
            x2={width - 50} 
            stroke="#ccc" />
          <text
            x={width -10}
            dy="0.32em"
            textAnchor="end"
            fontSize={10}
            fill="#666"
          >
            {val.toFixed(2)}
          </text>
        </g>
      ))}
    </>
  )
}