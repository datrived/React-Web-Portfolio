
import React from 'react'
import { Button } from 'reactstrap';
import * as d3 from 'd3'
import {withFauxDOM} from 'react-faux-dom'
import './Home.css'


class Bubbles extends React.Component {
  
  constructor(props){
	  super(props);
	  this.state = {isCombine: true, winX: window.innerWidth, winY: window.innerHeight};
	  this.handleClick = this.handleClick.bind(this);
	  this.updateDimensions = this.updateDimensions.bind(this);
  }
  updateDimensions(){
	  //const el = this.refs.mainElement;
	  //this.setState({isCombine: this.state.isCombine, winX: window.innerWidth, winY: window.innerHeight });
	  //this.forceUpdate();
	  

  }

  
  handleClick(){
	  if(this.state.isCombine === true){
		  this.setState({isCombine:false})
		  this.renderAgain(this.state.isCombine);
	  }
	  else{
		  this.setState({isCombine:true})
		  this.renderAgain(this.state.isCombine);
	  }
	  
	  console.log(this.state.isCombine);
	  
  }
  
  
  componentDidMount () {
	  //this.updateDimensions();
   
	  //this.result = this.props.result;
	  const faux = this.props.connectFauxDOM('div', 'chart')
   		//window.addEventListener("resize", this.updateDimensions);
   var svg= d3.select(faux)
      .append('svg')
      .attr("height", this.props.size[1])
	  .attr("width", this.props.size[0])
	  .append("g")
	  .attr("transform", "translate(0,0)");

let data = this.props.data;






let result = this.state.isCombine;
let winX = this.state.winX;
let winY = this.state.winY;
console.log("result " + result);
var radiusScale = d3.scaleSqrt().domain([10,40])
								.range([winX/100, winX/17])
	
	var vis = svg.selectAll("circle")
   					.data(data)
					.enter()
					.append("g")
					
   var circles = vis.append("circle")
					.attr("r", function(d){
						return radiusScale(d.value)
					})
					.style("fill", function(d){
						return d.color
					})
					
	var img = vis.append("image")
	.attr("height",function(d){
						return radiusScale(d.value)} )
	.attr("width", function(d){
						return radiusScale(d.value)})
	.attr("preserveAspectRatio", "none")
	.attr("xmlnsXlink", "http://www.w3.org/1999/xlink")
	.attr("xlink:href", function(d){
		return d.image
	})
	.attr("x", function(d){
						return radiusScale(d.value)/2 - radiusScale(d.value) })
	.attr("y", function(d){
						return radiusScale(d.value)/2 - radiusScale(d.value) })


function createSimulation(){
	var forceX = d3.forceX(function(d){
	 if(result === false){
	   if(d.area === "Web"){
		   return winX/4;
	   }
	   else{
		   return winX*3/4;
	   }
	}else{
		return winX/2;
	}}
	).strength(0.05);
	
	
	var forceY = d3.forceY(winY*0.40).strength(0.05);
	var forceCollide = d3.forceCollide(function(d){
						return radiusScale(d.value) + 5
					}).strength(0.25);

	var simulation = d3.forceSimulation()
					.force("x", forceX)
					.force("y", forceY)
					.force("collide", forceCollide)
					.alphaTarget(0.011)
					



		simulation.nodes(data)
				.on("tick", ticked)

function ticked(){
	vis.attr("transform", function (d) {
        var k = "translate(" + d.x + "," + d.y + ")";
        return k;
    })
	
}
}

createSimulation();

this.props.animateFauxDOM(1000)
 this.renderAgain= function(r){
	 result = !r;
	 console.log("result: : :  "+ result);
	 createSimulation();
	 this.props.animateFauxDOM(2000);
 }
 //window.addEventListener("resize", this.updateDimensions);
  
}

componentWillMount() {
   
  }

  componentWillUnmount() {
    
  }
  render () {
	  
    return (
      <div>
        
		<div id="wrapperButton">
		<Button color="warning" size="lg" onClick={this.handleClick}>{this.state.isCombine ? 'Skill Devide': 'Skill Combine'}</Button> 
        </div>
		<div id="toggleHeader">
			<h4>Web </h4>
			<h4>Mobile </h4>
		</div>
		<div className='renderedD3'>
          {this.props.chart}
        </div>
      </div>
    )
  }
}

Bubbles.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(Bubbles)


