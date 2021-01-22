export const create = (side) => {

    var plotscale = 400;

    var margin = {
        top: (plotscale * (24/960)), 
        right: (plotscale * (20/960)), 
        bottom: (plotscale * (24/960)), 
        left: (plotscale* (40/960))
    },
        width =  plotscale - margin.left - margin.right ,
        height = (plotscale * (68/105) - margin.top - margin.bottom);

    var x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    var svg = d3.select(`#pitch-${side}`)
        .append('svg')
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('class', 'mesh')
        .attr('width', width)
        .attr('height', height);

    // field outline    
    svg.append('rect')
        .attr('id','outline')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'none')
        .attr('stroke', 'black'); 

    // right penalty area 
    svg.append('rect')
        .attr('id','six')
        .attr('x', x(83))
        .attr('y', y(78.9))
        .attr('width', x(100) - x(83))
        .attr('height', y(21.1) - y(78.9))
        .attr('fill', 'none')
        .attr('stroke', 'black');

    // right six yard box
    svg.append('rect')
        .attr('id','penarea')
        .attr('x', x(94.2))
        .attr('y', y(63.2))
        .attr('width', x(100) - x(94.2))
        .attr('height', y(36.8) - y(63.2))
        .attr('fill', 'none')
        .attr('stroke', 'black');

    // right goal
	svg.append('rect')
		.attr('id','penarea')
		.attr('x', x(100))
		.attr('y', y(54.8))
		.attr('width', margin.right - 1)
		.attr('height', y(45.2) - y(54.8))
		.attr('fill', 'none')
		.attr('stroke', 'black');   

    // left penalty area 
	svg.append('rect')
	   .attr('id','six')
	   .attr('x', x(0))
	   .attr('y', y(78.9))
	   .attr('width', x(100) - x(83))
	   .attr('height', y(21.1) - y(78.9))
	   .attr('fill', 'none')
	   .attr('stroke', 'black');
    
    // six yard box
	svg.append('rect')
		.attr('id','penarea')
		.attr('x', x(0))
		.attr('y', y(63.2))
		.attr('width', x(100) - x(94.2))
		.attr('height', y(36.8) - y(63.2))
		.attr('fill', 'none')
		.attr('stroke', 'black');

    // right goal
	svg.append('rect')
		.attr('id','penarea')
		.attr('x', x(0) - margin.right + 1)
		.attr('y', y(54.8))
		.attr('width', margin.right - 1)
		.attr('height', y(45.2) - y(54.8))
		.attr('fill', 'none')
		.attr('stroke', 'black');  
 
    // 50 yd line
	 svg.append('line')
		.attr('id','half')
		.attr('x1', x(50))
		.attr('x2', x(50))
		.attr('y1', y(0))
		.attr('y2', y(100))
        .attr('stroke', 'black'); 
        
    // center circle
	svg.append('circle')
	   .attr('cx', x(50))
	   .attr('cy', y(50))
	   .attr('r', x(10))
	   .attr('fill', 'none')
       .attr('stroke', 'black');

    return svg;

}