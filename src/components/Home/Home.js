import React, { Component } from 'react';
import './Home.css';
import Bubbles from './Bubbles'
import $ from 'jquery';


const ang= require('../../Assets/Angular.png')
const react = require('../../Assets/react.png')
const vue = require('../../Assets/vue.png')
const d3= require('../../Assets/d3.jpeg')
const web= require('../../Assets/webpack.jpeg')
const node = require('../../Assets/node.png')
const backbone = require('../../Assets/backbone.jpeg')
const django = require('../../Assets/django.png')
const php = require('../../Assets/php.jpeg')
const android = require('../../Assets/android.png')
const kotlin = require('../../Assets/kotlin.png')
const java = require('../../Assets/java.png')
const w=window.innerWidth;
const h=window.innerHeight;

const setData = [{"id": 1, "name": "Angular", "value": 20,"area":"Web", "image": ang, "color": "red"},
				 {"id": 2, "name": "React", "value": 30,"area":"Web", "image": react, "color": "lightblue"},
				 {"id": 3, "name": "Vue", "value": 25,"area":"Web", "image": vue, "color": "green"},
				 {"id": 4, "name": "D3", "value": 18,"area":"Web", "image": d3, "color": "orange"},
				 {"id": 5, "name": "WebPack", "value": 35,"area":"Web", "image": web, "color": "gray"},
				 {"id": 6, "name": "Node.js", "value": 24,"area":"Web", "image": node, "color": "lightgreen"},
				 {"id": 7, "name": "Backbone.js", "value": 33,"area":"Mobile", "image": backbone, "color": "blue"},
				 {"id": 8, "name": "Django", "value": 40,"area":"Mobile", "image": django, "color": "#c0e2de"},
				 {"id": 9, "name": "PHP", "value": 37,"area":"Mobile", "image": php, "color": "#ddd5ef"},
				 {"id": 10, "name": "Android", "value": 29,"area":"Mobile", "image": android, "color": "#19593b"},
				 {"id": 11, "name": "Kotlin", "value": 33,"area":"Mobile", "image": kotlin, "color": "#5e58a0"},
				 {"id": 12, "name": "Java", "value": 22,"area":"Language", "image": java, "color": "#efe7e1"}
				 	];

class App extends Component {
	constructor(props){
		super(props)
		this.state = {windowX: window.innerWidth, windowY:window.innerHeight }
	}


	
   render() {
   return (
      <div className='App'>
	     <Bubbles data={setData} size={[this.state.windowX/1.1,this.state.windowY*3/4]} />
      </div>
   )
   }
}
export default App






