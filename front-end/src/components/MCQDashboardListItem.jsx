import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function MCQDashboardListItem({ content }) {
  const d3Container = useRef(null);
  const legendContainer = useRef(null);

  useEffect(() => {
    if (d3Container.current && content) {
      d3.select(d3Container.current).selectAll("*").remove();

      const optionIDs = content.options.map((option) => option.optionID);

      const color = d3.scaleOrdinal(d3.schemeCategory10).domain(optionIDs);

      const pieData = content.options
        .map((option) => ({
          label: option.optionValue,
          value: content.subData[option.optionID] / content.norQuestion,
          responses: content.subData[option.optionID],
          id: option.optionID,
        }))
        .filter((option) => option.value > 0);

      const legendData = content.options.map((option) => ({
        label: option.optionValue,
        value: content.subData[option.optionID] / content.norQuestion,
        responses: content.subData[option.optionID],
        id: option.optionID, // Include optionID for color mapping
      }));

      const width = 360;
      const height = 360;
      const radius = Math.min(width, height) / 2;

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const pie = d3.pie().value((d) => d.value);
      const path = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
      const label = d3
        .arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

      svg
        .selectAll(".arc")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("class", "arc")
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => color(d.data.id)); // Use optionID for color

      svg
        .selectAll(".arc")
        .data(pie(pieData))
        .append("text")
        .attr("transform", (d) => `translate(${label.centroid(d)})`)
        .text((d) => `${(d.data.value * 100).toFixed(2)}%`)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("fill", "white");

      // Prepare the legend in the separate div
      if (legendContainer.current) {
        d3.select(legendContainer.current).selectAll("*").remove();

        const legend = d3
          .select(legendContainer.current)
          .selectAll(".legend-item")
          .data(legendData)
          .enter()
          .append("div")
          .attr("class", "legend-item")
          .style("display", "flex")
          .style("align-items", "center")
          .style("margin-bottom", "5px");

        legend
          .append("div")
          .style("width", "18px")
          .style("height", "18px")
          .style("margin-right", "5px")
          .style("background-color", (d) => color(d.id)); // Use optionID for color

        legend
          .append("text")
          .text((d) => `${d.label}: ${(d.value * 100).toFixed(2)}%`);
      }
    }
  }, [content]);

  return (
    <div className="mcq-dashboard-card">
      <div className="mcq-dashboard-question">{content.question}</div>
      <div className="mcq-dashboard-norQuestion">
        {content.norQuestion} responses
      </div>
      <div className="mcq-dashboard-pie-chart" ref={d3Container}></div>
      <div className="mcq-dashboard-legend" ref={legendContainer}></div>
    </div>
  );
}

export default MCQDashboardListItem;
