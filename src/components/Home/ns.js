import {EventEmitter} from 'events';
//var EventEmitter = require('events').EventEmitter;

//import ColorHash from 'color-hash';

var d3 = require('d3');
//import 'd3-transition';
var ns = {};

var ANIMATION_DURATION = 400;
var TOOLTIP_WIDTH = 30;
var TOOLTIP_HEIGHT = 30;

////const colorHash = new ColorHash();

ns.create = function(el, props, state){

var svg = d3.select(el)
		  .append("svg")
		  .attr("class", "d3")
		  .attr("width", props.width)
		  .attr("height", props.heignt)
		  
	svg.append("g")
		.attr("transform", "translate(0,0)")
		.attr('class', 'd3-points')
		
	
	svg.append("g")
		.attr("transform", "translate(0,0)")
		.attr("class", "d3-tooltip")

var dispatcher = new EventEmitter();
this.update(el, state, dispatcher);

return dispatcher;


};


ns.update = function(el,props, state, dispatcher) {
  var scales = this.setScales();
  var prevScales = this.setScales();
  this.drawCircles(el, scales, state.data, prevScales, dispatcher);
  //this.drawTooltips(el, props,  scales, state.tooltips, prevScales);
};

ns.setScales = function() {
  

  var r = d3.scaleSqrt()
    .range([5, 20])
    .domain([1, 300]);

  return {r:r};
};

ns.drawCircles = function(el, props, scales, data, prevScales, dispatcher) {
  var g = d3.select(el).selectAll('.d3-points');

  var simulation = d3.forceSimulation()
  					 .force("x", d3.forceX(props.width/2).strength(0.05)) 
					 .force("y", d3.forceY(props.height/2).strength(0.05)) 
					 .force("collide", d3.forceCollide(function(d){
							if (prevScales) {
          						return prevScales.r(d.r);
       						 }
        					return scales.r(d.r);
					 		}))
		simulation.nodes(data)
				  .on('tick', ticked);
	
 function ticked(){
	 point.attr("cx", function(d){
		 return d.x
	 })
	 .attr("cy", function(d){
		 return d.y
	 });
 };
  
  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });


  point.enter().append('circle')
      .attr('class', 'd3-point')
      .attr('r', function(d) {
        if (prevScales) {
          return prevScales.r(d.r);
        }
        return scales.r(d.r);
      })
	  .attr("fill", "lightblue")
      .attr('cx', 100)
	  .attr("cy", 100);

  point
      .on('mouseover', function(d) {
        dispatcher.emit('point:mouseover', d);
      })
      .on('mouseout', function(d) {
        dispatcher.emit('point:mouseout', d);
      })
    .transition()
      .duration(ANIMATION_DURATION)
      
  if (prevScales) {
    point.exit()
      .transition()
        .duration(ANIMATION_DURATION)
        .attr('r', function(d) { return scales.r(d.r); })
        .remove();
  }
  else {
    point.exit()
        .remove();
  }
};

ns.drawTooltips = function(el, scales, tooltips, prevScales) {
  var g = d3.select(el).selectAll('.d3-tooltips');

  var tooltipRect = g.selectAll('.d3-tooltip-rect')
    .data(tooltips, function(d) { return d.id; });

  tooltipRect.enter().append('rect')
      .attr('class', 'd3-tooltip-rect')
      .attr('width', TOOLTIP_WIDTH)
      .attr('height', TOOLTIP_HEIGHT)
      .attr('x', function(d) {
        if (prevScales) {
          return TOOLTIP_WIDTH/2;
        }
        return  TOOLTIP_WIDTH/2;
      })
    .transition()
      .duration(ANIMATION_DURATION)
      .attr('x', function(d) { return  TOOLTIP_WIDTH/2; });

  tooltipRect.attr('y', function(d) { return TOOLTIP_HEIGHT; })
    .transition()
      .duration(ANIMATION_DURATION)
      .attr('x', function(d) { return TOOLTIP_WIDTH/2; });

  if (prevScales) {
    tooltipRect.exit()
      .transition()
        .duration(ANIMATION_DURATION)
        .attr('x', function(d) { return TOOLTIP_WIDTH/2; })
        .remove();
  }
  else {
    tooltipRect.exit()
        .remove();
  }

  var tooltipText = g.selectAll('.d3-tooltip-text')
    .data(tooltips, function(d) { return d.id; });

  tooltipText.enter().append('text')
      .attr('class', 'd3-tooltip-text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(function(d) { return d.r; })
      .attr('x', function(d) {
        if (prevScales) {
          return prevScales.r(d.r);
        }
        return scales.r(d.r);
      })
    .transition()
      .duration(ANIMATION_DURATION)
      .attr('x', function(d) { return scales.r(d.r); });

  tooltipText.attr('y', function(d) { return TOOLTIP_HEIGHT/2; })
    .transition()
      .duration(ANIMATION_DURATION)
      .attr('x', function(d) { return scales.r(d.r); });

  if (prevScales) {
    tooltipText.exit()
      .transition()
        .duration(ANIMATION_DURATION)
        .attr('x', function(d) { return scales.r(d.r); })
        .remove();
  }
  else {
    tooltipText.exit()
        .remove();
  }
};

ns.destroy = function(el) {

};

export default ns;
