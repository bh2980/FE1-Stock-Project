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

const Bar = ({ xScale, yScale, data, nullBarHeight = 0, animationDuration = "0.3s", rx, labelPostfix = "", ...props }: BarProps) => {
  const rectWidth = xScale.bandwidth();
  const rectHeight = yScale(0) - yScale(data.value || nullBarHeight);
  const rectX = xScale(data.label.toString())!;
  const rectY = yScale(data.value || nullBarHeight);

  const labelOffset = 8;

  return (
    <g {...props}>
      <rect
        width={rectWidth}
        height={rectHeight}
        x={rectX}
        y={rectY}
        rx={rx}
        stroke={data.value === null ? "inherit" : undefined}
        strokeDasharray={data.value === null ? "6, 4" : undefined}
        fill={data.value === null ? "none" : undefined}
      >
        <animate attributeName="height" from="0" to={rectHeight} dur={animationDuration} fill="freeze" />
        <animate attributeName="y" from={yScale(0)} to={rectY} dur={animationDuration} fill="freeze" />
      </rect>
      <text x={rectX + rectWidth / 2} y={rectY - labelOffset} textAnchor="middle" className="stroke-none">
        {data.value ? `${data.value}${labelPostfix}` : "?"}
        <animate attributeName="y" from={yScale(0) - labelOffset} to={rectY - labelOffset} dur={animationDuration} fill="freeze" />
      </text>
    </g>
  );
};

const BarChart = ({ width, height, data, padding = 0.5 }: BarChartProps) => {
  const margin = { left: 0, bottom: 32 };

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
        return <Bar key={`bar-${i}`} xScale={xScale} yScale={yScale} data={data} rx="6" nullBarHeight={50} className="stroke-secondary fill-secondary font-bold text-body2" />;
      })}
      <BandAxis xScale={xScale} textAnchor="middle" transform={`translate(0, ${height - margin.bottom})`} className="text-body2 fill-surface-on-variant" />
    </svg>
  );
};

export default BarChart;
