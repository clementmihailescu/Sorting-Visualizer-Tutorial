import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 20;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 80;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#35858B';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#AEFEFF';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="main-layout">

        <div className="bars-pane">
          {array.map((value, idx) => (
            <div
            className="bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
            ))}
        </div>

        <div className="btn-pane">
          <a target="_blank" href="https://github.com/namitoyokota" rel="noopener noreferrer" >
            <img class="icon" src="https://img.icons8.com/color/50/000000/github--v3.png" alt="github"/>
          </a>
          <button className="fancy-btn" onClick={() => this.resetArray()}>Generate New Array</button>
          <button className="fancy-btn" onClick={() => this.mergeSort()}>Merge Sort</button>
          <a target="_blank" href="https://vsco.co/yokota-namito/gallery" rel="noopener noreferrer" >
            <img src="https://img.icons8.com/plasticine/60/000000/vsco-logo.png" alt="vsco" />
          </a>
        </div>

      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
