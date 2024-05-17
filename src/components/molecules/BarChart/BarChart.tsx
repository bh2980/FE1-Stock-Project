import { max, scaleBand, scaleLinear } from "d3";

import { isEven } from "@utils/isEven";

import { BandAxisProps, BarChartProps, BarProps } from "./BarChart.types";

const BandAxis = ({ xScale, outerTickLength = 6, innerTickLength = 6, ...props }: BandAxisProps) => {
  const [startPoint, endPoint] = xScale.range();
  const tickCount = xScale.domain().length;

  const tickStartPoint = (endPoint - startPoint) / 2 - xScale.step() * (isEven(tickCount) ? tickCount / 2 - 0.5 : Math.floor(tickCount / 2));

  return (
    <g {...props}>
      <path fill="none" d={`M${startPoint},${outerTickLength}V0H${endPoint}V${outerTickLength}`}></path>
      {xScale.domain().map((label, i) => (
        <g key={`tick-${i}`} transform={`translate(${tickStartPoint + xScale.step() * i}, 0)`}>
          <line y2={innerTickLength} fill="none" />
          <text y="24" stroke="none">
            {label}
          </text>
        </g>
      ))}
    </g>
  );
};

const Bar = ({ xScale, yScale, data, ...props }: BarProps) => {
  return <rect width={xScale.bandwidth()} height={yScale(0) - yScale(data.value)} x={xScale(data.label.toString())} y={yScale(data.value)} {...props} />;
};

const BarChart = ({ width, height, data, padding = 0.5, nullBarHeight = 0 }: BarChartProps) => {
  const margin = { left: 0, bottom: 32 };
  const animationDuration = "0.3s";

  const xScale = scaleBand()
    .domain(data.map((d) => d.label.toString()))
    .range([margin.left, width - margin.left])
    .padding(padding);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => (d.value ? d.value : 0))!])
    .nice()
    .range([height - margin.bottom, margin.bottom]);

  return (
    <svg width={width} height={height}>
      {data.map((data, i) => {
        const barData = data.value === null ? { ...data, value: nullBarHeight } : data;

        return (
          <g key={`bar-${i}`}>
            {data.value !== null ? (
              <Bar xScale={xScale} yScale={yScale} data={barData} rx="6" className="fill-secondary">
                <animate attributeName="height" from="0" to={yScale(0) - yScale(data.value)} dur={animationDuration} fill="freeze" />
                <animate attributeName="y" from={yScale(0)} to={yScale(data.value)} dur={animationDuration} fill="freeze" />
              </Bar>
            ) : (
              <Bar xScale={xScale} yScale={yScale} data={barData} rx="6" strokeDasharray="6, 4" className="stroke-secondary fill-none">
                <animate attributeName="height" from="0" to={yScale(0) - yScale(nullBarHeight)} dur={animationDuration} fill="freeze" />
                <animate attributeName="y" from={yScale(0)} to={yScale(nullBarHeight)} dur={animationDuration} fill="freeze" />
              </Bar>
            )}
            <text x={xScale(data.label.toString())! + xScale.bandwidth() / 2} y={yScale(data.value || nullBarHeight) - 8} textAnchor="middle" className="text-surface-on font-bold text-body2">
              {data.value ? `${data.value}억` : "?"}
              <animate attributeName="y" from={yScale(0) - 8} to={yScale(data.value || nullBarHeight) - 8} dur={animationDuration} fill="freeze" />
            </text>
          </g>
        );
      })}
      <BandAxis xScale={xScale} textAnchor="middle" transform={`translate(0, ${height - margin.bottom})`} className="text-body2 fill-surface-on-variant" />
    </svg>
  );
};

export default BarChart;
