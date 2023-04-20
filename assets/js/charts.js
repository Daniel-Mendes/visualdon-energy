import * as d3 from "d3";
import { nuclearColor, fossilColor } from "./colors";

d3.json("assets/data/owid-energy-switzerland-data.json")
  .then((data) => {
    const dataParsed = {
      fossilChart: [],
      hydraulicChart: [],
      nuclearChart: [],
      solarChart: [],
      windChart: [],
    };

    data["Switzerland"].data.forEach((d) => {
      if (d.year >= 1960) {
        dataParsed.fossilChart.push({
          year: d3.timeParse("%Y")(d.year),
          fossil_fuel_consumption: d.fossil_fuel_consumption || 0,
        });

        dataParsed.nuclearChart.push({
          year: d3.timeParse("%Y")(d.year),
          nuclear_electricity: d.nuclear_electricity || 0,
        });
      }
    });

    return dataParsed;
  })
  .then((data) => {
    fossilChart(data.fossilChart);
    hydraulicChart(data.hydraulicChart);
    nuclearChart(data.nuclearChart);
    solarChart(data.solarChart);
    windChart(data.windChart);
  });

const fossilChart = (data) => {
  const margin = { top: 40, right: 40, bottom: 40, left: 80 },
    width = 1024 - margin.left - margin.right,
    height = 512 - margin.top - margin.bottom;

  const svg = d3
    .select("#fossil-chart")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", 20)
    .text("Consommation d'énergies fossiles en Suisse");

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.year))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.fossil_fuel_consumption)])
    .range([height, 0]);

  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.fossil_fuel_consumption));

  const path = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", fossilColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  const pathLength = path.node().getTotalLength();

  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength);
  // .transition(transitionPath)
  // .ease(d3.easeSin)
  // .attr("stroke-dashoffset", 0);

  // Create a new Intersection Observer instance
  const observer = new IntersectionObserver(
    (entries) => {
      // Loop through the IntersectionObserverEntry objects
      entries.forEach((entry) => {
        // If the target element is intersecting the viewport
        if (entry.isIntersecting) {
          // Calculate the intersection ratio
          const ratio = entry.intersectionRatio;

          // Update the stroke opacity based on the intersection ratio
          path.style("opacity", ratio >= 1 ? 1 : 0);

          // If the stroke is visible, animate it
          if (ratio >= 1) {
            const transitionPath = d3.transition().duration(3000);

            path.transition(transitionPath).attr("stroke-dashoffset", 0);

            setTimeout(() => {
              document
                .querySelector("#fossil-chart")
                .querySelectorAll("text, circle")
                .forEach((element) => {
                  element.style.opacity = 1;
                });
            }, 3010);
          }
        }
      });
    },
    {
      threshold: 1,
    }
  );

  // Observe the target element
  observer.observe(document.querySelector("#fossil-chart"));

  svg
    .append("g")
    .attr("class", "axis-lines")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "axis-lines").call(d3.axisLeft(y));

  const xGrid = d3.axisBottom(x).tickSize(-height, 0, 0).tickFormat("");

  const yGrid = d3.axisLeft(y).tickSize(-width, 0, 0).tickFormat("");

  svg
    .append("g")
    .attr("class", "grid-lines")
    .attr("transform", `translate(0, ${height})`)
    .call(xGrid);

  svg.append("g").attr("class", "grid-lines").call(yGrid);

  // Label x-axis
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "middle")
    .text("Année");

  // Label y-axis
  svg
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left / 2)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Consommation de combustibles fossiles (en TWh)");

  // Label source
  svg
    .append("text")
    .attr("x", width)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "end")
    .style("font-size", 10)
    .text("Source: Our World in Data");

  /*
   ** Only when observer is in viewport
   */

  // Circle in 1973 crisis
  svg
    .append("circle")
    .attr("cx", x(d3.timeParse("%Y")(1973)))
    .attr("cy", y(data[1973 - 1960].fossil_fuel_consumption))
    .attr("r", 5)
    .attr("fill", fossilColor)
    .style("opacity", 0);

  // Text in 1973 crisis
  svg
    .append("text")
    .attr("x", x(d3.timeParse("%Y")(1973)) - 2)
    .attr("y", y(data[1973 - 1960].fossil_fuel_consumption) + 20)
    .attr("writing-mode", "vertical-lr")
    .attr("alignment-baseline", "middle")
    .style("font-size", 10)
    .text("Crise du pétrole de 1973")
    .style("opacity", 0);

  // Circle in 2008 crisis
  svg
    .append("circle")
    .attr("cx", x(d3.timeParse("%Y")(2008)))
    .attr("cy", y(data[2008 - 1960].fossil_fuel_consumption))
    .attr("r", 5)
    .attr("fill", fossilColor)
    .style("opacity", 0);

  // Text in 2008 crisis
  svg
    .append("text")
    .attr("x", x(d3.timeParse("%Y")(2008)))
    .attr("y", y(data[2008 - 1960].fossil_fuel_consumption) + 15)
    .attr("writing-mode", "vertical-lr")
    .attr("alignment-baseline", "middle")
    .style("font-size", 10)
    .text("Crise financière de 2008")
    .style("opacity", 0);

  // Circle in 2015 Paris Agreement
  svg
    .append("circle")
    .attr("cx", x(d3.timeParse("%Y")(2015)))
    .attr("cy", y(data[2015 - 1960].fossil_fuel_consumption))
    .attr("r", 5)
    .attr("fill", fossilColor)
    .style("opacity", 0);

  // Text in 2015 Paris Agreement
  svg
    .append("text")
    .attr("x", x(d3.timeParse("%Y")(2015)))
    .attr("y", y(data[2015 - 1960].fossil_fuel_consumption) + 15)
    .attr("writing-mode", "vertical-lr")
    .attr("alignment-baseline", "middle")
    .style("font-size", 10)
    .text("Accord de Paris")
    .style("opacity", 0);
};

const hydraulicChart = (data) => {};

const nuclearChart = (data) => {
  const margin = { top: 40, right: 40, bottom: 40, left: 80 },
    width = 1024 - margin.left - margin.right,
    height = 512 - margin.top - margin.bottom;

  const svg = d3
    .select("#nuclear-chart")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", 20)
    .text("Production d'électricité nucléaire en Suisse");

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.year))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.nuclear_electricity)])
    .range([height, 0]);

  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.nuclear_electricity));

  const transitionPath = d3.transition().duration(3000);

  const path = svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", nuclearColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  const pathLength = path.node().getTotalLength();

  path
    .attr("stroke-dashoffset", pathLength)
    .attr("stroke-dasharray", pathLength)
    .transition(transitionPath)
    .ease(d3.easeSin)
    .attr("stroke-dashoffset", 0);

  svg
    .append("g")
    .attr("class", "axis-lines")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "axis-lines").call(d3.axisLeft(y));

  const xGrid = d3.axisBottom(x).tickSize(-height, 0, 0).tickFormat("");

  const yGrid = d3.axisLeft(y).tickSize(-width, 0, 0).tickFormat("");

  svg
    .append("g")
    .attr("class", "grid-lines")
    .attr("transform", `translate(0, ${height})`)
    .call(xGrid);

  svg.append("g").attr("class", "grid-lines").call(yGrid);

  // Label x-axis
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "middle")
    .text("Année");

  // Label y-axis
  svg
    .append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left / 2)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Production d'électricité nucléaire (TWh)");

  // Label source
  svg
    .append("text")
    .attr("x", width)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "end")
    .style("font-size", 10)
    .text("Source: Our World in Data");

  setTimeout(() => {
    // Circle in 1967 centrale nucléaire expérimentale de Lucens
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(1967)))
      .attr("cy", y(data[1967 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 1967 centrale nucléaire expérimentale de Lucens
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(1967)) - 2)
      .attr("y", y(data[1967 - 1960].nuclear_electricity) - 20)
      .attr("text-anchor", "end")
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Centrale nucléaire expérimentale de Lucens en 1967");

    // Circle in 1969 Beznau I
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(1969)))
      .attr("cy", y(data[1969 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 1969 Beznau I
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(1969)) - 2)
      .attr("y", y(data[1969 - 1960].nuclear_electricity) - 20)
      .attr("text-anchor", "end")
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Beznau I en 1969");

    // Circle in 1971 Beznau II
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(1971)))
      .attr("cy", y(data[1971 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 1971 Beznau II
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(1971)) - 2)
      .attr("y", y(data[1971 - 1960].nuclear_electricity) - 20)
      .attr("text-anchor", "end")
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Beznau II en 1971");

    // Circle in 1972 Mühleberg
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(1972)))
      .attr("cy", y(data[1972 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 1972 Mühleberg
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(1972)) - 2)
      .attr("y", y(data[1972 - 1960].nuclear_electricity) - 20)
      .attr("text-anchor", "end")
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Mühleberg en 1972");

    // Circle in 1979 Gösgen
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(1979)))
      .attr("cy", y(data[1979 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 1979 Gösgen
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(1979)) - 2)
      .attr("y", y(data[1979 - 1960].nuclear_electricity) - 20)
      .attr("text-anchor", "end")
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Gösgen en 1979");

    // Circle in 1984 Leibstadt
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(1984)))
      .attr("cy", y(data[1984 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 1984 Leibstadt
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(1984)) - 2)
      .attr("y", y(data[1984 - 1960].nuclear_electricity) - 20)
      .attr("text-anchor", "end")
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Leibstadt en 1984");

    // Circle in 2011 Fukushima accident
    svg
      .append("circle")
      .attr("cx", x(d3.timeParse("%Y")(2011)))
      .attr("cy", y(data[2011 - 1960].nuclear_electricity))
      .attr("r", 5)
      .attr("fill", nuclearColor);

    // Text in 2011 Fukushima accident
    svg
      .append("text")
      .attr("x", x(d3.timeParse("%Y")(2011)))
      .attr("y", y(data[2011 - 1960].nuclear_electricity) + 15)
      .attr("writing-mode", "vertical-lr")
      .attr("alignment-baseline", "middle")
      .style("font-size", 10)
      .text("Accident de Fukushima en 2011");
  }, 3000);
};

const solarChart = (data) => {};

const windChart = (data) => {};
