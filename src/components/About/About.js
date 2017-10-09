import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import './About.css';
const me = require('../../Assets/me.png');


class About extends Component {
	
  
  render() {
    return (
      <div className="About">
		  <div id="cardwrapper">
        <Card >
        <CardImg id="cardimg" src={me} alt="Me" />
        <CardBody>
          <CardTitle>Devanshi Trivedi</CardTitle>
          <CardSubtitle>Full-Stack Developer</CardSubtitle>
          <CardText>Hi, I am current Software Engineer Student at Arizona State University and will be Graduating this December-2017. </CardText>
          
        </CardBody>
      </Card>
	  </div>
      </div>
    );
  }
}

export default About;