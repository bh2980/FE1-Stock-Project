import * as d3 from "d3";
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

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year.toString()))
    .range([margin.left, width - margin.left])
    .padding(0.4);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => (d.value ? d.value : 0))!])
    .nice()
    .range([height - margin.bottom, margin.bottom]);

  console.log(xScale);

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
            className="fill-secondary"
          />
          <text x={xScale(d.year.toString())! + xScale.bandwidth() / 2} y={yScale(d.value || nullBarHeight) - 8} textAnchor="middle" className="text-surface-on font-bold text-body2">
            {d.value ? `${d.value}억` : "?"}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default BarChart;
