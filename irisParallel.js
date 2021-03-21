const svg = d3.select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
  
const margin = { top: 50, right: 20, bottom: 10, left: 20 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const g = svg.append('g')
	.attr('transform', `translate(${margin.left},${margin.top})`);
                 
//extract the list of dimensions and store data in y object
d3.csv('https://raw.githubusercontent.com/chungmin-yu/iris-plots-of-visulization/main/iris.csv', function(data) {
  dimensions = d3.keys(data[0]).filter(d => { return d != 'class' }) 
  var y = {}
  for (element in dimensions) {
    attribute = dimensions[element]
    y[attribute] = d3.scaleLinear()
      //.domain(d3.extent(data, d => { return +d[attribute]; }) )
      .domain([0,8])
      .range([innerHeight, 0])

  }

   

  //map Iris's class to color
  const colorValue = function(d){ return d.class;}
  const colorScale = d3.scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#28004D']);



  //return x and y coordinates of the line to draw
  function path(d) {
      return d3.line()(dimensions.map(p => { return [x(p), y[p](d[p])]; }));
  } 
      
  //build the four X scale
    x = d3.scalePoint()
      .range([0, 750])
      .padding(0.2)
      .domain([dimensions[0],dimensions[1],dimensions[2],dimensions[3]]);

    //draw the path
    g.selectAll('myPath')
      .data(data)
      .enter().append('path')
      .attr('d',  path)
      .style('fill', 'none')
      .style('stroke', d => colorScale(colorValue(d)))
      .style('opacity', 0.3)

    //draw the axis
    g.selectAll('myAxis')
      .data(dimensions).enter()
      .append('g')
      .attr('transform', t => { return 'translate(' + x(t) + ')'; })
      .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
      .append('text')
        .style('text-anchor', 'middle')
        .attr('y', -22)
        .text(t => { return t; })
        .style('fill', '#635F5D')
        .style('font-size', '2.2em')    
   
  //update the select axis' button 
  var axis_select = document.getElementById("select");
  axis_select.onchange = function() { 
  var valOption = this.options[this.selectedIndex].value; 
    
    //set axis variable
    var a,b,c,d;
    a=Math.round(valOption/1000)-1;
    b=Math.round((valOption%1000)/100)-1;
    c=Math.round((valOption%100)/10)-1;
    d=valOption%10-1;
    
    //build the four X scale
    x = d3.scalePoint()
      .range([0, 750])
      .padding(0.2)
      .domain([dimensions[a],dimensions[b],dimensions[c],dimensions[d]]);
		
    //reset
    g.selectAll('path')
      .remove()
    g.selectAll('text')
    	.remove()
    g.selectAll('circle')
    	.remove()

    //draw the path
    g.selectAll('myPath')
      .data(data)
      .enter().append('path')
      .attr('d',  path)
      .style('fill', 'none')
      .style('stroke', d => colorScale(colorValue(d)))
      .style('opacity', 0.3)

    //draw the axis
    g.selectAll('myAxis')
      .data(dimensions).enter()
      .append('g')
      .attr('transform', t => { return 'translate(' + x(t) + ')'; })
      .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
      .append('text')
        .style('text-anchor', 'middle')
        .attr('y', -22)
        .text(t => { return t; })
        .style('fill', '#635F5D')
        .style('font-size', '2.2em')
    
    //typesetting
    g.append('text')
        .attr('y', 95)
        .attr('x', 760)
        .attr('fill', '#635F5D')
        .style('font-size', '1.6em')
        .text('Iris Class');

    g.append('circle')
        .attr('cy', 135)
        .attr('cx', 750)
        .attr('r', 10)
        .attr('fill', '#E6842A');   
    g.append('text')
        .attr('y', 142)
        .attr('x', 770)
        .attr('fill', '#635F5D')
        .style('font-size', '1.3em')
        .text('Iris-setosa');

    g.append('circle')
        .attr('cy', 175)
        .attr('cx', 750)
        .attr('r', 10)
        .attr('fill', '#137B80');   
    g.append('text')
        .attr('y', 182)
        .attr('x', 770)
        .attr('fill', '#635F5D')
        .style('font-size', '1.3em')
        .text('Iris-versicolor');

    g.append('circle')
        .attr('cy', 215)
        .attr('cx', 750)
        .attr('r', 10)
        .attr('fill', '#28004D');   
    g.append('text')
        .attr('y', 222)
        .attr('x', 770)
        .attr('fill', '#635F5D')
        .style('font-size', '1.3em')
        .text('Iris-virginica');
 	} 

  //typesetting
  g.append('text')
  		.attr('y', 95)
  		.attr('x', 760)
  		.attr('fill', '#635F5D')
  		.style('font-size', '1.6em')
  		.text('Iris Class');
  
  g.append('circle')
  		.attr('cy', 135)
  		.attr('cx', 750)
  		.attr('r', 10)
  		.attr('fill', '#E6842A');   
  g.append('text')
  		.attr('y', 142)
  		.attr('x', 770)
  		.attr('fill', '#635F5D')
  		.style('font-size', '1.3em')
  		.text('Iris-setosa');
  
  g.append('circle')
  		.attr('cy', 175)
  		.attr('cx', 750)
  		.attr('r', 10)
  		.attr('fill', '#137B80');   
  g.append('text')
  		.attr('y', 182)
  		.attr('x', 770)
  		.attr('fill', '#635F5D')
  		.style('font-size', '1.3em')
  		.text('Iris-versicolor');
  
  g.append('circle')
  		.attr('cy', 215)
  		.attr('cx', 750)
  		.attr('r', 10)
  		.attr('fill', '#28004D');   
  g.append('text')
  		.attr('y', 222)
  		.attr('x', 770)
  		.attr('fill', '#635F5D')
  		.style('font-size', '1.3em')
  		.text('Iris-virginica');

})            