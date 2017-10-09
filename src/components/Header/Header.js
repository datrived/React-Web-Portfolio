import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link, NavLink as RouterNavLink} from 'react-router-dom';
import './Header.css';

class Header extends Component {
	constructor(props) {
     	super(props);

    	this.toggle = this.toggle.bind(this);
    	this.state = {
      		isOpen: false
    	};
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}
  render() {
    const baz = () => <NavLink className="navbar-brand" tag={Link} to="/">Devanshi Trivedi</NavLink>
    return (
      <div className="Header">
        <Navbar style={{backgroundColor: "#fcf3d9"}} light expand="md">
          <NavbarBrand tag={baz}></NavbarBrand>
          <NavbarToggler  onClick={this.toggle}  />
          <Collapse  isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink  tag={RouterNavLink} to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink  tag={RouterNavLink} to="/experience">Experience</NavLink>
                </NavItem>
              <NavItem>
                <NavLink  tag={RouterNavLink} to="/hireme">Hire Me</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;