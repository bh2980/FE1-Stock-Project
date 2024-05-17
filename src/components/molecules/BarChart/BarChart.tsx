import { max, scaleBand, scaleLinear } from "d3";

import { isEven } from "@utils/isEven";

import { BandAxisProps, BarChartProps, BarProps } from "./BarChart.types";

const BandAxis = ({ xScale, outerTickLength = 6, innerTickLength = 6, ...props }: BandAxisProps) => {
  const [startPoint, endPoint] = xScale.range();

  const tickStartPoint = (endPoint - startPoint) / 2 - xScale.step() * (isEven(xScale.domain().length) ? xScale.domain().length / 2 - 0.5 : Math.floor(xScale.domain().length / 2));

  return (
    <g {...props}>
      <path fill="none" d={`M${startPoint},${outerTickLength}V0H${endPoint}V${outerTickLength}`}></path>
      {xScale.domain().map((label, i) => (
        <g key={`tick-${i}`} transform={`translate(${tickStartPoint + xScale.step() * i}, 0)`}>
          <line y2={innerTickLength} />
          <text y="24" stroke="none">
            {label}
          </text>
        </g>
      ))}
    </g>
  );
};

const Bar = ({ xScale, yScale, data, nullBarHeight = 0, ...props }: BarProps) => {
  return <rect width={xScale.bandwidth()} height={yScale(0) - yScale(data.value || nullBarHeight)} x={xScale(data.label.toString())} y={yScale(data.value || nullBarHeight)} {...props} />;
};

const BarChart = ({ width, height, data }: BarChartProps) => {
  const nullBarHeight = 50;
  const barRadius = 6;
  const margin = { left: 0, bottom: 32 };

  const xScale = scaleBand()
    .domain(data.map((d) => d.label.toString()))
    .range([margin.left, width - margin.left])
    .padding(0.5);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => (d.value ? d.value : 0))!])
    .nice()
    .range([height - margin.bottom, margin.bottom]);

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => (
        <g key={`bar-${i}`}>
          {d.value !== null ? (
            <Bar xScale={xScale} yScale={yScale} data={d} nullBarHeight={50} rx="6" className="fill-secondary">
              <animate attributeName="height" from="0" to={yScale(0) - yScale(d.value || nullBarHeight)} dur="0.5s" fill="freeze" />
              <animate attributeName="y" from={yScale(0)} to={yScale(d.value || nullBarHeight)} dur="0.5s" fill="freeze" />
            </Bar>
          ) : (
            <Bar xScale={xScale} yScale={yScale} data={{ ...d, value: 50 }} rx={barRadius} strokeDasharray="6,4" className="stroke-black fill-none">
              <animate attributeName="height" from="0" to={yScale(0) - yScale(d.value || nullBarHeight)} dur="0.5s" fill="freeze" />
              <animate attributeName="y" from={yScale(0)} to={yScale(d.value || nullBarHeight)} dur="0.5s" fill="freeze" />
            </Bar>
          )}
          <text x={xScale(d.label.toString())! + xScale.bandwidth() / 2} y={yScale(d.value || nullBarHeight) - 8} textAnchor="middle" className="text-surface-on font-bold text-body2">
            {d.value ? `${d.value}억` : "?"}
            <animate attributeName="y" from={yScale(0) - 8} to={yScale(d.value || nullBarHeight) - 8} dur="0.5s" fill="freeze" />
          </text>
        </g>
      ))}
      <BandAxis xScale={xScale} textAnchor="middle" transform={`translate(0, ${height - margin.bottom})`} className="stroke-none text-body1 fill-surface-on-variant" />
    </svg>
  );
};

export default BarChart;
