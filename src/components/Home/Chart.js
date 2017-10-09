import {React, Component} from 'react';


var _ = require('lodash');

var d3Chart = require('./ns');



class Chart extends React.Component{
  
  constructor(props) {
    super(props);
	  this.state = this.getChartState();
  }
  
  getDefaultProps() {
    return {
      width: '700',
      height: '500'
    };
  }



  componentDidMount() {
    var dispatcher = null,
	var el = this.getDOMNode();
    var dispatcher = d3Chart.create(el, {
      width: this.props.width,
      height: this.props.height
    }, this.getChartState());
    dispatcher.on('point:mouseover', this.showTooltip);
    dispatcher.on('point:mouseout', this.hideTooltip);
    this.dispatcher = dispatcher;
  }

  componentDidUpdate(prevProps, prevState) {
    var el = this.getDOMNode();
    d3Chart.update(el,this.getDefaultProps(), this.getChartState(), this.dispatcher);
  }

  getChartState() {
    var appState = this.props.appState;

    var tooltips = [];
    if (appState.showingAllTooltips) {
      tooltips = appState.data;
    }
    else if (appState.tooltip) {
      tooltips = [appState.tooltip];
    }

    return _.assign({}, appState, {tooltips: tooltips});
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }

  showTooltip(d) {
    if (this.props.appState.showingAllTooltips) {
      return;
    }

    this.props.setAppState({
      tooltip: d,
      // Disable animation
      prevDomain: null
    });
  }

  hideTooltip() {
    if (this.props.appState.showingAllTooltips) {
      return;
    }
    
    this.props.setAppState({
      tooltip: null,
      prevDomain: null
    });
  }
};

export default Chart;