import * as d3 from 'd3';

const oilColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-oil')})`;
const hydraulicColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-hydraulic')})`;
const nuclearColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-nuclear')})`;
const solarColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-solar')})`;
const windColor = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--color-wind')})`;

d3.json("assets/data/owid-energy-switzerland-data.json")
.then(data => {
    const dataParsed = {
        oilChart: [],
        hydraulicChart: [],
        nuclearChart: [],
        solarChart: [],
        windChart: []
    };

    data["Switzerland"].data.forEach(d => {
        if (d.year >= 1960) {
            dataParsed.oilChart.push({
                year: d3.timeParse("%Y") (d.year),
                oil_consumption: d.oil_consumption || 0
            });
        }
    });

    return dataParsed;
}).then(data => {
    oilChart(data.oilChart);
    hydraulicChart(data.hydraulicChart);
    nuclearChart(data.nuclearChart);
    solarChart(data.solarChart);
    windChart(data.windChart);
});

function oilChart(data) {
    const margin = { top: 40, right: 40, bottom: 40, left: 80 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select('#oil-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', 20)
        .text('Oil Consumption per year in Switzerland');

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.year))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.oil_consumption)])
        .range([height, 0]);

    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.oil_consumption));

    const transitionPath = d3
        .transition()
        .duration(3000);

    const path = svg.append('path')
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", oilColor)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr('d', line);

    const pathLength = path.node().getTotalLength();

    path
        .attr("stroke-dashoffset", pathLength)
        .attr("stroke-dasharray", pathLength)
        .transition(transitionPath)
        .ease(d3.easeSin)
        .attr("stroke-dashoffset", 0);

    svg.append('g')
        .attr('class', 'axis-lines')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('class', 'axis-lines')
        .call(d3.axisLeft(y));

    const xGrid = d3.axisBottom(x)
        .tickSize(-height, 0, 0)
        .tickFormat('');

    const yGrid = d3.axisLeft(y)
        .tickSize(-width, 0, 0)
        .tickFormat('');

    svg.append('g')
        .attr('class', 'grid-lines')
        .attr('transform', `translate(0, ${height})`)
        .call(xGrid);

    svg.append('g')
        .attr('class', 'grid-lines')
        .call(yGrid);

    // Label x-axis
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'middle')
        .text('Year');

    // Label y-axis
    svg.append('text')
        .attr('x', -height / 2)
        .attr('y', -margin.left / 2)
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Oil consumption (TJ)');

    // Label source
    svg.append('text')
        .attr('x', width)
        .attr('y', height + margin.bottom)
        .attr('text-anchor', 'end')
        .style('font-size', 10)
        .text('Source: Our World in Data');

    setTimeout(() => {
        // Circle in 1973 crisis
        svg.append('circle')
            .attr('cx', x(d3.timeParse("%Y") (1973)))
            .attr('cy', y(data[1973 - 1960].oil_consumption))
            .attr('r', 5)
            .attr('fill', oilColor)

        // Text in 1973 crisis
        svg.append('text')
            .attr('x', x(d3.timeParse("%Y") (1973)) - 2)
            .attr('y', y(data[1973 - 1960].oil_consumption) + 20)
            .attr('writing-mode', 'vertical-lr')
            .attr('alignment-baseline', 'middle')
            .style('font-size', 10)
            .text('Crise du pétrole de 1973');

        // Circle in 2008 crisis
        svg.append('circle')
            .attr('cx', x(d3.timeParse("%Y") (2008)))
            .attr('cy', y(data[2008 - 1960].oil_consumption))
            .attr('r', 5)
            .attr('fill', oilColor);

        // Text in 2008 crisis
        svg.append('text')
            .attr('x', x(d3.timeParse("%Y") (2008)))
            .attr('y', y(data[2008 - 1960].oil_consumption) + 15)
            .attr('writing-mode', 'vertical-lr')
            .attr('alignment-baseline', 'middle')
            .style('font-size', 10)
            .text('Crise financière de 2008');

    }, 3000);
}

function hydraulicChart(data) {

}

function nuclearChart(data) {

}

function solarChart(data) {

}

function windChart(data) {

}