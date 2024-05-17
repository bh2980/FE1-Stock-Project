import * as d3 from "d3";
import React from "react";

type BarChartDataType = { year: number; value: number | null };

type BarChartProps = {
  width: number;
  height: number;
  data: BarChartDataType[];
};

const BarChart = ({ width, height, data }: BarChartProps) => {
  // const svgRef = useRef<SVGSVGElement>(null);

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

  // useEffect(() => {
  //   if (!svgRef.current) return;

  //   const svg = d3.select(svgRef.current);

  //   svg.selectAll("*").remove();

  //   svg
  //     .append("g") // 새로운 <g> 요소를 추가
  //     .selectAll("rect") // 모든 'rect' 요소를 선택 (현재는 없음)
  //     .data(data) // 데이터 바인딩
  //     .join("rect") // 데이터와 일치하는 'rect' 요소 생성
  //     .attr("x", (d) => xScale(d.year.toString())!) // 막대 바의 x 위치 설정
  //     .attr("y", yScale(0)) // 막대 바의 y 위치 설정
  //     .attr("height", 0) // 막대 바의 높이 설정
  //     .attr("width", xScale.bandwidth()) // 막대 바의 너비 설정
  //     .attr("fill", (d) => (d.value === null ? "none" : "steelblue")) // 막대 바의 색상 설정
  //     .attr("stroke", (d) => (d.value === null ? "steelblue" : "none"))
  //     .attr("stroke-dasharray", (d) => (d.value === null ? "6,4" : null))
  //     .attr("rx", barRadius)
  //     .transition() // 트랜지션 시작
  //     .duration(500) // 애니메이션 지속 시간 설정 ms
  //     .attr("y", (d) => yScale(d.value || nullBarHeight)) // 애니메이션 끝 y 위치
  //     .attr("height", (d) => yScale(0) - yScale(d.value || nullBarHeight)); // 애니메이션 끝 높이

  //   svg
  //     .append("g")
  //     .selectAll("text")
  //     .data(data)
  //     .join("text")
  //     .attr("x", (d) => xScale(d.year.toString())! + xScale.bandwidth() / 2)
  //     .attr("y", height - 48)
  //     .attr("text-anchor", "middle")
  //     .style("font-size", "13.3px")
  //     .style("fill", "black")
  //     .text((d) => (d.value !== null ? d.value + "억" : "?"))
  //     .transition()
  //     .duration(500)
  //     .attr("y", (d) => yScale(d.value || nullBarHeight) - 8);

  //   svg
  //     .append("g")
  //     .call(d3.axisBottom(xScale))
  //     .attr("transform", `translate(0, ${height - margin.bottom})`)
  //     .selectAll("text")
  //     .style("font-size", "13.3px")
  //     .style("fill", "steelblue");

  //   svg.selectAll("path").remove();
  //   svg.selectAll("line").remove();
  // }, [data]);

  return (
    <>
      {/* <svg ref={svgRef} width="400" height="300"></svg> */}
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
            ></rect>
            <text
              x={xScale(d.year.toString())! + xScale.bandwidth() / 2}
              y={yScale(d.value || nullBarHeight) - 8}
              textAnchor="middle"
              className="text-surface-on font-bold text-body2"
            >
              {d.value ? `${d.value}억` : "?"}
            </text>
          </g>
        ))}
      </svg>
    </>
  );
};

export default BarChart;
