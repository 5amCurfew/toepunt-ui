import * as viewPitch from './viewPitch.js';

export const create = (side, lineUp = 'default') => {
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

    const pitch = viewPitch.create(side);

    if(lineUp != 'default'){

        const form = lineUp.formation.split('-');
        const gk = lineUp.startXI.filter( (p) => p.player.pos == 'G');
        const def = lineUp.startXI.slice(1, parseInt(form[0])+1)
        const mid = lineUp.startXI.slice(parseInt(form[0])+1, 11 - parseInt(form.slice(-1)));
        const att = lineUp.startXI.slice(-form.slice(-1))

        ///////////////////////////////
        // GK
        ///////////////////////////////
        pitch
            .append('g')
            .selectAll("dot")
            .data(gk)
            .enter()
            .append('circle')
                .attr('cy', function(d, i) { return y(50) })
                .attr('cx', function(d, i) { return x(side == 'home' ? 8 : 92) })
                .attr('fill', side == 'home' ? '#51a2d0' : '#ff8adb')
                .attr('stroke', 'grey')
                .attr('stroke-width', '2px')
                .attr("r", 12)
                .on("mouseover", mouseOverGK)
                .on("mouseout", mouseOut)

        pitch
            .append('g')
            .selectAll("dot")
            .data(gk)
            .enter()
            .append('text')
                .attr('y', function(d, i) { return y(50-1.5) })
                .attr('x', function(d, i) { return x(side == 'home' ? 8-1 : 92-1) })
                .attr('font-size', 11.5)
                .attr('fill', side == 'home' ? '#ffffff' : '#000000')
                .text(function(d) {return d.player.number})

        function mouseOverGK(d){
            d3.select(this).attr('stroke', side == 'home' ? '#b4d7eb' : '#ffcdef');
            d3.select(this).attr('stroke-width', "3px");

            pitch
                .append("text")
                .attr('id',  "t" + d.player.name.replaceAll(' ', '_').replaceAll('.', '_'))
                .attr('y', function() { return y( 50 + 10 )})
                .attr('x', function() { return x( side == 'home'? 8 - 7 : 100 - 8 - 7) })
                .attr("font-size", ".75em")
                .attr("color", "black")
                .text(function() {
                    return d.player.name;  // Value of the text
                })
        };

        ///////////////////////////////
        // DEF
        ///////////////////////////////
        pitch
            .append('g')
            .selectAll("dot")
            .data(def)
            .enter()
            .append('circle')
                .attr('cy', function(d, i) { return y(side == 'home' ? ((100/(def.length+1))*(i+1)) : ((100/(def.length+1))*(def.length-i)) ) })
                .attr('cx', function(d, i) { return x(side == 'home' ? 25 : 75) })
                .attr('fill', side == 'home' ? '#51a2d0' : '#ff8adb')
                .attr('stroke', 'grey')
                .attr('stroke-width', '2px')
                .attr("r", 12)
                .on("mouseover", mouseOverDef)
                .on("mouseout", mouseOut)

        pitch
            .selectAll("dot")
            .data(def)
            .enter()
            .append('text')
                .attr('y', function(d, i) { return y(side == 'home' ? ((100/(def.length+1))*(i+1)) - 1.5 : ((100/(def.length+1))*(def.length-i)) - 1.5 ) })
                .attr('x', function(d, i) { return x(side == 'home' ? 25-1.5 : 75-1.5) })
                .attr('font-size', 11.5)
                .attr('fill', side == 'home' ? '#ffffff' : '#000000')
                .text(function(d) {return d.player.number})

        function mouseOverDef(d,i){
            d3.select(this).attr('stroke', side == 'home' ? '#b4d7eb' : '#ffcdef');
            d3.select(this).attr('stroke-width', "3px");

            pitch
                .append("text")
                .attr('id',  "t" + d.player.name.replaceAll(' ', '_').replaceAll('.', '_'))
                .attr('y', function() { return y( side == 'home' ? ((100/(def.length+1))*(i+1)) + 10 : ((100/(def.length+1))*(def.length-i)) + 10 )})
                .attr('x', function() { return x(side == 'home' ? 25-7 : 75 - 7) })
                .attr("font-size", ".75em")
                .attr("color", "black")
                .text(function() {
                    return d.player.name;  // Value of the text
                })
        };

        let formation = lineUp.formation ?? '4-4-2';
        let midLayers = formation.split('-').slice(1,-1)
        midLayers.forEach( (players_count, index) => {
            let start = midLayers[index-1] ? parseInt(midLayers[index-1]) : 0;
            let end = midLayers[index-1] ? parseInt(midLayers[index-1]) + parseInt(players_count) : parseInt(players_count) ;
            let midLayer = mid.slice(start, end);

            function mouseOverMid(d,i){
                d3.select(this).attr('stroke', side == 'home' ? '#b4d7eb' : '#ffcdef');
                d3.select(this).attr('stroke-width', "3px");

                pitch
                    .append("text")
                    .attr('id',  "t" + d.player.name.replaceAll(' ', '_').replaceAll('.', '_'))
                    .attr('y', function() { return y( side == 'home' ? ((100/(midLayer.length+1))*(i+1)) + 10 : ((100/(midLayer.length+1))*(midLayer.length-i)) + 10) })
                    .attr('x', function() { return x( side == 'home' ? 25 - 7 + 50/(midLayers.length+1)*(index+1) : 75 - 7 - (50/(midLayers.length+1)*(index+1))) })
                    .attr("font-size", ".75em")
                    .attr("color", "black")
                    .text(function() {
                        return d.player.name;  // Value of the text
                    })
            };

            pitch
                .append('g')
                .selectAll("dot")
                .data(midLayer)
                .enter()
                .append('circle')
                    .attr('cy', function(d, i) { 
                        return y( side == 'home' ? ((100/(midLayer.length+1))*(i+1)) :  ((100/(midLayer.length+1))*(midLayer.length-i)) ) 
                    })
                    .attr('cx', function(d, i) { 
                        return x( side == 'home' ? 25 + 50/(midLayers.length+1)*(index+1) : 75 - (50/(midLayers.length+1)*(index+1)) )
                    })
                    .attr('fill', side == 'home' ? '#51a2d0' : '#ff8adb')
                    .attr('stroke', 'grey')
                    .attr('stroke-width', '2px')
                    .attr("r", 12)
                    .on("mouseover", mouseOverMid)
                    .on("mouseout", mouseOut)

            pitch
                .selectAll("dot")
                .data(midLayer)
                .enter()
                .append('text')
                    .attr('y', function(d, i) { 
                        return y( side == 'home' ? ((100/(midLayer.length+1))*(i+1)) - 1.5 :  ((100/(midLayer.length+1))*(midLayer.length-i)) - 1.5) 
                    })
                    .attr('x', function(d, i) { 
                        return x( side == 'home' ? 25 - 1.5 + 50/(midLayers.length+1)*(index+1) : 75 - 1.5 - (50/(midLayers.length+1)*(index+1)))
                    })
                        .attr('font-size', 11.5)
                        .attr('fill', side == 'home' ? '#ffffff' : '#000000')
                        .text(function(d) {return d.player.number})
        });

        pitch
            .append('g')
            .selectAll("dot")
            .data(att)
            .enter()
            .append('circle')
                .attr('cy', function(d, i) { return y( side == 'home' ? ((100/(att.length+1))*(i+1)) : ((100/(att.length+1))*(att.length-i)) ) })
                .attr('cx', function(d, i) { return x(side == 'home' ? 75 : 25) })
                .attr('fill', side == 'home' ? '#51a2d0' : '#ff8adb')
                .attr('stroke', 'grey')
                .attr('stroke-width', '2px')
                .attr("r", 12)
                .on("mouseover", mouseOverAtt)
                .on("mouseout", mouseOut);
        pitch
            .selectAll("dot")
            .data(att)
            .enter()
            .append('text')
                .attr('y', function(d, i) { return y( side == 'home' ? ((100/(att.length+1))*(i+1)) - 1.5 : ((100/(att.length+1))*(att.length-i)) - 1.5) })
                .attr('x', function(d, i) { return x(side == 'home' ? 75-1.5 : 25-1.5) })
                .attr('font-size', 11.5)
                .attr('fill', side == 'home' ? '#ffffff' : '#000000')
                .text(function(d) {return d.player.number})
       
        function mouseOverAtt(d,i){
            d3.select(this).attr('stroke', side == 'home' ? '#b4d7eb' : '#ffcdef');
            d3.select(this).attr('stroke-width', "3px");

            pitch
                .append("text")
                .attr('id',  "t" + d.player.name.replaceAll(' ', '_'))
                .attr('y', function() { return y( side == 'home' ? ((100/(att.length+1))*(i+1)) + 10 : ((100/(att.length+1))*(att.length-i)) + 10) })
                .attr('x', function() { return x(side == 'home' ? 75-7 : 25 - 7) })
                .attr("font-size", ".75em")
                .attr("color", "black")
                .text(function() {
                    return d.player.name;  // Value of the text
                })
        };

        function mouseOut(d,i){ 
            d3.select("#t" + d.player.name.replaceAll(' ', '_').replaceAll('.', '_')).remove();
            d3.select(this).attr('stroke', "grey");
            d3.select(this).attr('stroke-width', "2px");
        };

    };
};