import { useMemo } from 'react';
import * as d3 from 'd3'

export default function AxesX({width, height, data}) {
  // console.log('data', data)
  const ticks = useMemo(() => {
    const tradeOpen = data.timestamp;
    const tradeClose = +data.timestamp + (6.5 * 60 * 60 * 1000);

    const xScale = d3.scaleUtc()
      .domain([tradeOpen, tradeClose])
      .range([0, width - 90])

    return xScale.ticks()
      .map(value => ({
        value,
        xOffset: xScale(value)
      }))
  }, [data, width]);

  return (
    <>
      {ticks.map(({ value, xOffset }) => (
        <g 
          className="x-axis-grid" 
          key={value.toISOString()} 
          transform={`translate(${xOffset + 50}, 20)`}>
          <text 
            y={-10} 
            textAnchor="middle" 
            fontSize={16 * .8} 
            fill="#666"
          >
            {d3.utcFormat('%H:%M')(value)}
          </text>
          <line 
            y2={height - 20} // fix this
            stroke="#dddddd" />
          <text 
            y={475} 
            textAnchor="middle" 
            fontSize={16 * .8} 
            fill="#666"
          >
            {d3.utcFormat('%H:%M')(value)}
          </text>
        </g>
      ))}
    </>
  );
}