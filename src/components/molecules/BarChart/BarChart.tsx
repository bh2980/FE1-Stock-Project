import { max, scaleBand, scaleLinear } from "d3";
import React from "react";

type BarChartDataType = { year: number; value: number | null };

type BarChartProps = {
  width: number;
  height: number;
  data: BarChartDataType[];
};

const BarChart = ({ width, height, data }: BarChartProps) => {
  const nullBarHeight = 50;
  const barRadius = 6;
  const margin = { left: 0, bottom: 32 };
  const outerTickLength = 6;
  const innerTickLength = 6;

  const xScale = scaleBand()
    .domain(data.map((d) => d.year.toString()))
    .range([margin.left, width - margin.left])
    .padding(0.4);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => (d.value ? d.value : 0))!])
    .nice()
    .range([height - margin.bottom, margin.bottom]);

  const tickStartPoint = (xScale.range()[1] - xScale.range()[0]) / 2 - xScale.step() * (xScale.domain().length % 2 === 0 ? xScale.domain().length / 2 - 0.5 : Math.floor(xScale.domain().length / 2));

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => (
        <g key={`bar-${i}`}>
          <rect
            width={xScale.bandwidth()}
            height={yScale(0) - yScale(d.value || nullBarHeight)}
            x={xScale(d.year.toString())}
            y={yScale(d.value || nullBarHeight)}
            rx={barRadius}
            stroke="currentColor"
            strokeDasharray={d.value === null ? "6, 4" : undefined}
            className={d.value === null ? "fill-none" : "fill-secondary"}
          />
          <text x={xScale(d.year.toString())! + xScale.bandwidth() / 2} y={yScale(d.value || nullBarHeight) - 8} textAnchor="middle" className="text-surface-on font-bold text-body2">
            {d.value ? `${d.value}억` : "?"}
          </text>
        </g>
      ))}
      <g transform={`translate(0, ${height - 32})`}>
        <path stroke="none" fill="none" d={`M${xScale.range()[0]},${outerTickLength}V0H${xScale.range()[1]}V${outerTickLength}`}></path>
        {xScale.domain().map((label, i) => (
          <g key={`tick-${i}`} transform={`translate(${tickStartPoint + xScale.step() * i}, 0)`} textAnchor="middle">
            <line stroke="none" y2={innerTickLength} />
            <text className="text-body2 text-secondary-container" y="24">
              {label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default BarChart;
