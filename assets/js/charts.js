import * as d3 from "d3";
import {
  nuclearColor,
  fossilColor,
  hydraulicColor,
  solarColor,
  windColor,
} from "./colors";

d3.json("assets/data/owid-energy-switzerland-data.json")
  .then((data) => {
    const dataParsed = {
      fossilChart: [],
      hydraulicChart: [],
      nuclearChart: [],
    };

    data["Switzerland"].data.forEach((d) => {
      if (d.year >= 1960) {
        dataParsed.fossilChart.push({
          year: d3.timeParse("%Y")(d.year),
          fossil_fuel_consumption: d.fossil_fuel_consumption || 0,
        });

        dataParsed.nuclearChart.push({
          year: d3.timeParse("%Y")(d.year),
          nuclear_electricity_production: d.hydro_electricity || 0,
        });

        dataParsed.hydraulicChart.push({
          year: d3.timeParse("%Y")(d.year),
          fossil_electricity_production: d.fossil_electricity || 0,
          hydraulic_electricity_production: d.hydro_electricity || 0,
          nuclear_electricity_production: d.nuclear_electricity || 0,
          solar_electricity_production: d.solar_electricity || 0,
          wind_electricity_production: d.wind_electricity || 0,
        });
      }
    });

    return dataParsed;
  })
  .then((data) => {
    fossilChart(data.fossilChart);
    hydraulicChart(data.hydraulicChart);
    nuclearChart(data.nuclearChart);
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

  const fossilPointsOfInterest = [
    {
      year: 1973,
      label: "Première crise pétrolière",
      x: x(d3.timeParse("%Y")(1973)),
      y: y(data[1973 - 1960].fossil_fuel_consumption),
    },
    {
      year: 1979,
      label: "Deuxième choc pétrolier",
      x: x(d3.timeParse("%Y")(1979)),
      y: y(data[1979 - 1960].fossil_fuel_consumption),
    },
    {
      year: 2008,
      label: "Crise financière",
      x: x(d3.timeParse("%Y")(2008)),
      y: y(data[2008 - 1960].fossil_fuel_consumption),
    },
    {
      year: 2015,
      label: "Accord de Paris",
      x: x(d3.timeParse("%Y")(2015)),
      y: y(data[2015 - 1960].fossil_fuel_consumption),
    },
    {
      year: 2020,
      label: "Crise du Covid",
      x: x(d3.timeParse("%Y")(2020)),
      y: y(data[2020 - 1960].fossil_fuel_consumption),
    },
  ];

  addPointOfInterests(svg, fossilPointsOfInterest, fossilColor);
};

const hydraulicChart = (data) => {
  // Stacked area chart

  const margin = { top: 40, right: 120, bottom: 40, left: 80 },
    width = 1024 - margin.left - margin.right,
    height = 512 - margin.top - margin.bottom;

  const svg = d3
    .select("#hydraulic-chart")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const keys = [
    "hydraulic_electricity_production",
    "fossil_electricity_production",
    "nuclear_electricity_production",
    "solar_electricity_production",
    "wind_electricity_production",
  ];

  const keysToColors = {
    hydraulic_electricity_production: hydraulicColor,
    fossil_electricity_production: fossilColor,
    nuclear_electricity_production: nuclearColor,
    solar_electricity_production: solarColor,
    wind_electricity_production: windColor,
  };

  const keysToLabels = {
    hydraulic_electricity_production: "Hydraulique",
    fossil_electricity_production: "Fossile",
    nuclear_electricity_production: "Nucléaire",
    solar_electricity_production: "Solaire",
    wind_electricity_production: "Eolien",
  };

  const stackedData = d3.stack().keys(keys)(data);

  const x = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.year))
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(stackedData[stackedData.length - 1], (d) => d[1])])
    .range([height, 0]);

  const area = d3
    .area()
    .x((d) => x(d.data.year))
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  svg
    .selectAll(".area")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", (d) => `area ${d.key}`)
    .attr("d", area)
    .style("fill", (d) => keysToColors[d.key])
    .style("opacity", 1);

  // Highlight hover effect
  const highlight = (d) => {
    // Reduce opacity of all the areas
    d3.selectAll(".area").style("opacity", 0.1);
    // expect the one that is hovered
    d3.select(`.${d.currentTarget.classList[0]}`).style("opacity", 1);
  };

  // And when it is not hovered anymore
  const noHighlight = (event) => {
    d3.selectAll(".area").style("opacity", 1);
  };

  svg
    .append("g")
    .attr("class", "axis-lines")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").attr("class", "axis-lines").call(d3.axisLeft(y));

  // Add a legend for each source
  const size = 20;
  svg
    .selectAll(".areaRectangles")
    .data(keys)
    .enter()
    .append("rect")
    .attr("x", width + 20)
    .attr("y", (d, i) => 10 + i * (size + 5))
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", (d) => keysToColors[d])
    .attr("class", (d) => d)
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight);

  svg
    .selectAll(".areaLabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", width + 20 + size * 1.2)
    .attr("y", (d, i) => 10 + i * (size + 5) + 6)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")
    .style("font-size", 10)
    .attr("class", (d) => d)
    .text((d) => keysToLabels[d])
    .on("mouseover", highlight)
    .on("mouseleave", noHighlight);

  // Title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", 16)
    .text("Production d'énergie par source");

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
    .text("Production d'électricité (TWh)");

  // Label source
  svg
    .append("text")
    .attr("x", width)
    .attr("y", height + margin.bottom)
    .attr("text-anchor", "end")
    .style("font-size", 10)
    .text("Source: Our World in Data");
};

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
    .domain([0, d3.max(data, (d) => d.nuclear_electricity_production)])
    .range([height, 0]);

  const line = d3
    .line()
    .x((d) => x(d.year))
    .y((d) => y(d.nuclear_electricity_production));

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
    .attr("stroke-dasharray", pathLength);

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

  const nucelarPointsOfInterest = [
    {
      year: 1967,
      label: "Centrale nucléaire expérimentale de Lucens",
      x: x(d3.timeParse("%Y")(1967)),
      y: y(data[1967 - 1960].nuclear_electricity_production),
    },
    {
      year: 1969,
      label: "Centrale nucléaire de Beznau I",
      x: x(d3.timeParse("%Y")(1969)),
      y: y(data[1969 - 1960].nuclear_electricity_production),
    },
    {
      year: 1971,
      label: "Centrale nucléaire de Beznau II",
      x: x(d3.timeParse("%Y")(1971)),
      y: y(data[1971 - 1960].nuclear_electricity_production),
    },
    {
      year: 1972,
      label: "Centrale nucléaire de Mühleberg",
      x: x(d3.timeParse("%Y")(1972)),
      y: y(data[1972 - 1960].nuclear_electricity_production),
    },
    {
      year: 1979,
      label: "Centrale nucléaire de Gösgen",
      x: x(d3.timeParse("%Y")(1979)),
      y: y(data[1979 - 1960].nuclear_electricity_production),
    },
    {
      year: 1984,
      label: "Centrale nucléaire de Leibstadt",
      x: x(d3.timeParse("%Y")(1984)),
      y: y(data[1984 - 1960].nuclear_electricity_production),
    },
    {
      year: 1986,
      label: "Catastrophe nucléaire de Tchernobyl",
      x: x(d3.timeParse("%Y")(1986)),
      y: y(data[1986 - 1960].nuclear_electricity_production),
    },
    {
      year: 2011,
      label: "Accident nucléaire de Fukushima",
      x: x(d3.timeParse("%Y")(2011)),
      y: y(data[2011 - 1960].nuclear_electricity_production),
    },
  ];

  addPointOfInterests(svg, nucelarPointsOfInterest, nuclearColor);
};

// Create a new Intersection Observer instance
const observerCharts = new IntersectionObserver(
  (entries) => {
    // Loop through the IntersectionObserverEntry objects
    entries.forEach((entry) => {
      // If the target element is intersecting the viewport
      if (entry.isIntersecting) {
        // Calculate the intersection ratio
        const ratio = entry.intersectionRatio;

        // Update the stroke opacity based on the intersection ratio
        entry.target.style.opacity = ratio >= 1 ? 1 : 0;

        // If the stroke is visible, animate it
        if (ratio >= 1) {
          const transitionPath = d3.transition().duration(3000);
          const path = d3.select(entry.target.querySelector("path"));

          path.transition(transitionPath).attr("stroke-dashoffset", 0);

          setTimeout(() => {
            const elementsToShow = entry.target.querySelectorAll(
              "g.point-of-interest circle"
            );

            for (let i = 0; i < elementsToShow.length; i++) {
              setTimeout(() => {
                elementsToShow[i].style.opacity = 1;
              }, 300 * i);
            }
          }, 3010);
        }
      }
    });
  },
  {
    threshold: 1,
  }
);

// Observe the target elements
document.querySelectorAll(".chart").forEach((element) => {
  observerCharts.observe(element);
});

const addPointOfInterests = (svg, pointsOfInterest, color) => {
  for (const pointOfInterest of pointsOfInterest) {
    const pointOfInterestGroup = svg
      .append("g")
      .attr("class", "point-of-interest")
      .attr(
        "transform",
        `translate(${pointOfInterest.x}, ${pointOfInterest.y})`
      );

    pointOfInterestGroup
      .append("circle")
      .attr("r", 5)
      .attr("fill", color)
      .on("mouseover", showPointOfInterest)
      .on("mouseout", hidePointOfInterest)
      .style("opacity", 0);

    pointOfInterestGroup
      .append("text")
      .attr("y", -15)
      .attr("text-anchor", "middle")
      //.attr("fill", color)
      .text(`${pointOfInterest.year}: ${pointOfInterest.label}`)
      .style("font-size", 14)
      .style("opacity", 0);
  }
};

const showPointOfInterest = (event) => {
  const circle = event.target;
  const label = event.target.nextElementSibling;

  if (circle) {
    circle.attributes.r.value = 7;
  }

  if (label) {
    label.style.opacity = 1;
  }
};

const hidePointOfInterest = (event) => {
  const circle = event.target;
  const label = event.target.nextElementSibling;

  if (circle) {
    circle.attributes.r.value = 5;
  }

  if (label) {
    label.style.opacity = 0;
  }
};
