import * as d3 from "d3";
import * as turf from "@turf/turf";
import { nuclearColor } from "./colors";

const nuclearPowerPlantsMap = () => {
  const margin = { top: 40, right: 40, bottom: 40, left: 80 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const geojson = Promise.all([
    d3.json("assets/data/switzerland-cantons.geojson"),
    d3.json("assets/data/switzerland-nuclear-power-plants.geojson"),
  ]);

  geojson.then(([cantons, nuclearPowerPlants]) => {
      const svg = d3
        .select("#nuclear-power-plants")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
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

      const projection = d3
        .geoMercator()
        .fitSize([width, height], {
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

  
        svg
          .selectAll("circle")
          .data(nuclearPowerPlants.features)
          .join((enter) =>
            enter
              .append("circle")
              .attr("cx", (d) => projection(d.geometry.coordinates)[0])
              .attr("cy", (d) => projection(d.geometry.coordinates)[1])
              .attr("r", 5)
              .attr("fill", nuclearColor)
          );
  
        svg
          .selectAll(".nuclearPowerStationLabel")
          .data(nuclearPowerPlants.features)
          .join((enter) => enter.append("text").attr("class", "nuclearPowerStationLabel"))
          .attr("x", (d) => projection(d.geometry.coordinates)[0])
          .attr("y", (d) => projection(d.geometry.coordinates)[1])
          .attr("transform", "translate(0, 16)")
          .text((d) => d.properties["Power station"])
          .attr("text-anchor", "middle")
          .attr("font-size", 10)
          .attr("fill", nuclearColor);
      });
};

nuclearPowerPlantsMap();
