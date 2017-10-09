import React, { Component } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import About from './components/About/About'
import { Route } from 'react-router-dom'
import Hireme from './components/Hireme/Hireme'
import Experience from './components/Experience/Experience'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Route exact path="/" component={Home}/>
        <Route path="/experience" component={Experience}/>
        <Route path="/about" component={About}/>
        <Route path="/hireme" component={Hireme}/>

        
        <Footer />
      </div>
    );
  }
}

export default App;
