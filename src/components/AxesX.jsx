import { useMemo } from 'react';
import * as d3 from 'd3'
import data from '../../market.json'

// export default function AxesX(width, data) {
export default function AxesX() {
  console.log('data', data)
  const ticks = useMemo(() => {
    const tradeOpen = data.timestamp;
    const tradeClose = +data.timestamp + (6.5 * 60 * 60 * 1000);

    const xScale = d3.scaleUtc()
      .domain([tradeOpen, tradeClose])
      // .range([0, width])
      .range([0, 710]);

    return xScale.ticks()
      .map(value => ({
        value,
        xOffset: xScale(value)
      }))
  }, [])

  return (
    <svg width={800} height={500}>
      {/* X-axis baseline */}
      <path
      // d="M 0.5 20.5 H 710.5" 
      stroke="currentColor" />

      {/* Ticks */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value.toISOString()} transform={`translate(${xOffset + 50}, 20)`}>
          <text y={-10} textAnchor="middle" fontSize={10} fill="#666">
            {d3.utcFormat('%H:%M')(value)}
          </text>
          <line y2="410" stroke="#ccc" />
          <text y={425} textAnchor="middle" fontSize={10} fill="#666">
            {d3.utcFormat('%H:%M')(value)}
          </text>
        </g>
      ))}
    </svg>
  );
}