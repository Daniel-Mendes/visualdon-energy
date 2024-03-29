import * as d3 from "d3";
import * as turf from "@turf/turf";
import { nuclearColor } from "./colors";

const geojson = Promise.all([
  d3.json("assets/data/switzerland-cantons.geojson"),
  d3.json("assets/data/switzerland-nuclear-power-plants.geojson"),
]);

geojson.then(([cantons, nuclearPowerPlants]) => {
  nuclearPowerPlantsMap(cantons, nuclearPowerPlants);
});

const nuclearPowerPlantsMap = (cantons, nuclearPowerPlants) => {
  const margin = { top: 40, right: 40, bottom: 40, left: 80 },
    width = 1024 - margin.left - margin.right,
    height = 512 - margin.top - margin.bottom;

  const svg = d3
    .select("#nuclear-power-plants")
    .append("svg")
    .attr(
      "viewBox",
      `0 0 ${width + margin.left + margin.right} ${
        height + margin.top + margin.bottom
      }`
    )
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg
    .select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Rewind data : pas obligatoire si les données sont dessinées dans le bon ordre
  let fixed = cantons.features.map(function (feature) {
    return turf.rewind(feature, { reverse: true });
  });

  const projection = d3.geoMercator().fitSize([width, height], {
    type: "FeatureCollection",
    features: fixed,
  });

  const path = d3.geoPath().projection(projection);

  svg
    .selectAll("path")
    .data(fixed)
    .join((enter) =>
      enter
        .append("path")
        .attr("d", path)
        .attr("fill", nuclearColor)
        .attr("stroke", nuclearColor)
        .attr("stroke-width", 1)
        .attr("opacity", 0.2)
    );

  // Show the name of the canton
  svg
    .selectAll("text")
    .data(fixed)
    .join((enter) => enter.append("text"))
    .attr(
      "x",
      (d) =>
        projection([
          d.properties.geo_point_2d.lon,
          d.properties.geo_point_2d.lat,
        ])[0]
    )
    .attr(
      "y",
      (d) =>
        projection([
          d.properties.geo_point_2d.lon,
          d.properties.geo_point_2d.lat,
        ])[1]
    )
    .text((d) => d.properties.kan_name_abbr)
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .attr("fill", nuclearColor)
    .attr("opacity", 0.5);

  // Point of interest in 2011 Fukushima accident
  for (let i = 0; i < nuclearPowerPlants.features.length; i++) {
    const pointOfInterestPowerPlant = svg
      .append("g")
      .attr("class", "point-of-interest")
      .style("opacity", 0)
      .attr(
        "transform",
        `translate(
          ${projection(nuclearPowerPlants.features[i].geometry.coordinates)[0]},
          ${projection(nuclearPowerPlants.features[i].geometry.coordinates)[1]}
        )`
      );

    pointOfInterestPowerPlant
      .append("circle")
      .attr("r", 5)
      .attr("fill", nuclearColor);

    pointOfInterestPowerPlant
      .append("text")
      .attr("transform", "translate(0, 16)")
      .text(nuclearPowerPlants.features[i].properties["Power station"])
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", nuclearColor);
  }
};

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
        entry.target.style.opacity = ratio >= 1 ? 1 : 0;

        // If the stroke is visible, animate it
        if (ratio >= 1) {
          const transitionPath = d3.transition().duration(3000);
          const path = d3.select(entry.target.querySelector("path"));

          path.transition(transitionPath).attr("stroke-dashoffset", 0);

          setTimeout(() => {
            const elementsToShow = entry.target.querySelectorAll(
              "g.point-of-interest"
            );

            for (let i = 0; i < elementsToShow.length; i++) {
              setTimeout(() => {
                elementsToShow[i].style.opacity = 1;
              }, 300 * i);
            }
          }, 1000);
        }
      }
    });
  },
  {
    threshold: 1,
  }
);

// Observe the target elements
observer.observe(document.querySelector("#nuclear-power-plants"));
