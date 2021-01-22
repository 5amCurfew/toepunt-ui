export const create = (scores, divID) => {

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 25, bottom: 30, left: 40},
        width = 420 - margin.left - margin.right,
        height = 380 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(`#${divID}`)
        .append('svg')
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var homeGoals = d3.map(scores, function(d){return d.home;}).keys()
    var awayGoals = d3.map(scores, function(d){return d.away;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(awayGoals.sort())
        .padding(0.05);

    svg.append('g')
        .style('font-size', 15)
        .call(d3.axisTop(x).tickSize(0))
        .select('.domain')
        .remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(homeGoals.sort().reverse())
        .padding(0.05)

    svg.append('g')
        .style('font-size', 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select('.domain')
        .remove()

    // Build color scale
    var homeColour = d3.scaleLinear()
        .domain([0,0.12])
        .range(['#cde4f1', '#077bbd'])
    var awayColour = d3.scaleLinear()
        .domain([0,0.12])
        .range(['#ffddf4', '#ff59cc'])
    var drawColour = d3.scaleLinear()
        .domain([0,0.12])
        .range(['#e4e4e4', '#7C7C7C'])

    // create a tooltip
    var tooltip = d3.select(`${divID}`)
        .append('div')
        .style('opacity', 0)
        .attr('class', 'tooltip')
        .style('border', 'solid')
        .style('border-width', '2px')
        .style('border-radius', '5px')

    var mouseover = function(d) {
        tooltip
            .style('opacity', 1)
        d3.select(this)
            .style('stroke', d.result == 'HOME' ? '#077bbd': d.result == 'AWAY' ? '#ff59cc' : '#7C7C7C')
            .style('stroke-width', 2)
    }

    var mouseleave = function(d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "grey")
            .style('stroke-width', 1)
    }

    // Add Grid
    svg.selectAll()
        .data(scores, function(d) {return d.away+':'+d.home;})
        .enter()
        .append('rect')
        .attr('x', function(d) { return x(d.away) })
        .attr('y', function(d) { return y(d.home) })
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('width', x.bandwidth() )
        .attr('height', y.bandwidth() )
        .style('fill', function(d) { 
            if(d.result == 'HOME'){
                return homeColour(d.probability)
            } else if(d.result == 'AWAY'){
                return awayColour(d.probability)
            } else{
                return drawColour(d.probability)
            }
        })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central") 
        .style('stroke-width', 1)
        .style('stroke', 'grey')
        .style('opacity', 0.8)
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)

        svg.selectAll()
            .data(scores)
            .enter()
            .append("text")
            .attr("class", "probLabel")
            .attr('opacity', .5)
            .attr("x", function(d) { return x(d.away) + width/17  })
            .attr("y", function(d) { return y(d.home) + height/11 })
            .text(function(d) {
                return `${Math.round(d.probability*100)}%`;
            })

};