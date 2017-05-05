import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'rc-slider/assets/index.css';

import Slider, { Range } from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const MyRange = createSliderWithTooltip(Range);

const tipFormatter = value => {
  let meridiem = value < 12 || value >= 24 ? 'AM' : 'PM';
  let unmil = value === 0 || value > 12 ? Math.abs(value - 12) : value;
  return `${unmil} ${meridiem}`;
}
class MySlider extends Component {
  state = {
    value: [10, 14]
  }
  MIN_GAP = 4;
  handleChange = ([min, max]) => {
    let { MIN_GAP } = this;
    if (max - min >= MIN_GAP) this.setState(()=>({ value:[min, max] }));
  }
  render() {

    let { value } = this.state;

    let marks = {}
    for (let i=0; i<25; i=i+3)
      marks[i] = { label:tipFormatter(i) };

    return (
      <div style={{display:'flex', justifyContent:'center'}}>
        <div style={{width:'600px'}}>
          <MyRange tipFormatter={tipFormatter} min={0} max={24} value={value} onChange={this.handleChange} marks={marks} allowCross={false} pushable={true} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MySlider />
      </div>
    );
  }
}

export default App;
