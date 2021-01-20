const data = [
    {date: '2007-04-23', value: 93.24},
    {date: '2007-04-24', value: 95.35},
    {date: '2007-04-25', value: 98.84},
    {date: '2007-04-26', value: 99.92},
    {date: '2007-04-29', value: 99.8},
    {date: '2007-05-01', value: 99.47},
    {date: '2007-05-02', value: 100.39},
    {date: '2007-05-03', value: 100.4},
    {date: '2007-05-04', value: 100.81},
    {date: '2007-05-07', value: 103.92},
    {date: '2007-05-08', value: 105.06},
    {date: '2007-05-09', value: 106.88},
    {date: '2007-05-09', value: 107.34},
    {date: '2007-05-10', value: 108.74},
    {date: '2007-05-13', value: 109.36},
    {date: '2007-05-14', value: 107.52},
    {date: '2007-05-15', value: 107.34},
    {date: '2007-05-16', value: 109.44},
    {date: '2007-05-17', value: 110.02},
    {date: '2007-05-20', value: 111.98}
]

class SimpleChart extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<div id="line-chart"></div>`;
        this.initLineChart();
    }

    initLineChart() {
        const width = 300;
        const height = 200;
        const margin = ({top: 20, right: 30, bottom: 30, left: 40});

        const x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top]);

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y));

        const line = d3.line()
            .defined(d => !isNaN(d.value))
            .x(d => x(d.date))
            .y(d => y(d.value));

        d3.select("#line-chart")
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .append("g")
            .call(xAxis).append("g")
            .call(yAxis).append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line);
    }
}

customElements.define('simple-chart', SimpleChart);