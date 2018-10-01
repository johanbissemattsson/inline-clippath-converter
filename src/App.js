import React, { Component } from 'react';
import { css } from 'glamor'
import SvgPath from 'svgpath'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '1440',
      height: '900',
      input: 'm5.299 29.348 83.908 6.586 75.195 2.933-25.433 231.85-21.076 67.442-52.689 25.291-36.883-30.56 11.592-42.151 43.224-49.566 63.913-44.121 48.331-1.88 45.555 14.71 40.133 30.151 3.788 32.791-23.905 23.079-38.11 6.386-21.557-27.357 6.342-32.686 33.309-32.364 65.05-40.831 23.043-26.858m15.913 179.96 1.912-53.6-8.001-56.312-9.824-70.048-3.527-51.733-2.87-34.716m135.27 122.44 34.755-23.738 41.127-5.063 26.585 8.958 13.742 43.206-1.179 55.927-19.93 33.48-44.512 2.591-19.7-47.654 20.988-27.047 25.984-4.583 112.17-34.205m-309.08 32.188 48.829-22.618 38.756 15.522 3.04 50.92-3.86 59.588m32.285-137.47 34.755-23.738 41.127-5.063 26.585 8.958 13.742 43.206-1.179 55.927-19.93 33.48-44.512 2.591-19.7-47.654 20.988-27.047 25.984-4.583 112.17-34.205m-13.538 122.19 11.578-41.548 1.96-80.638 47.259-10.699 46.367 25.291-1.816 69.942-8.542 44.617m-572.15 42.958 77.173 29.63 17.915 55.85-48.475 71.601-38.559 0.304-25.598-44.506 6.199-45.313 88.01 38.39m5.473 12.818 43.889 53.924 2.107 24.056-62.98 53.62-45.313 6.323-56.39-5.053-51.343-14.152-11.61-37.563 5.547-58.493 11.721-85.728m263.18-46.224 9.627 58.528m-62.44 128.74 53.203-68.769 18.56-3.695 0.161 52.196 12.914 57.053 44.94 14.633 58.081-1.548 21.076-13.576 17.307-27.863-10.538-23.184-56.24-23.202-19.756-42.132 20.145-30.56 28.453-7.377 32.667 34.775m-5.269 68.496 57.389 25.203 38.99 2.898 30.56-20.791 11.591-29.506-30.348-21.609-38.148-19.488 5.269-34.775 20.022-24.238 36.259 6.754 18.809 10.401 111.6 63.153 43.377-7.53 12.646-34.774-12.646-35.829-40.044-10.538-49.528 30.56-10.537 54.797-7.377 49.528 23.183 35.828 42.152 6.323 45.313-18.968m-770.93 335.6-2.166-58.468-6.534-70.148 4.216-56.904v-20.022l63.227-14.753 64.281 59.012 8.215 49.528-28.345 26.506-33.828-8.611-17.45-33.218 26.845-35.24 44.743-39.028 23.022-21.576 43.918-1.607 18.237 40.67 3.146 101.65 5.284 64.85m-5.193-117.88 54.51-50.646 47.631-16.936 51.778 29.506 13.842 67.566-6.608 29.383-18.721 42.74-49.775 3.788-22.129-39.152 7.376-47.42 60.636-18.342 33.778-16.898 97.161-32.028 66.48-19.143 90.174-38.224m-215.66-10.535 10.308 71.481 16.885 82.119 21.95 30.221 54.885 7.883m1.985-222.32 13.673 152.02 28.33 31.588 34.413 16.531m154.61-154.47-51.428-14.724-34.652-2.15-35.302 12.358 4.904 42.224 26.183 26.721 28.452 17.753 16.861 37.937-42.152 18.968-47.635-9.377m284.76-115.67-49.646-32.299-33.867-9.237-27.092-0.934-39.382 28.433 5.368 41.601 49.367 22.129 30.721 25.291-22.291 29.506-24.237 16.861-83.91-15.269m194.97-106.08 34.953-38.971 31.598-0.886 15.094 23.028 2.439 46.057-19.86 54.913-32.626 20.371-37.953-1.771-18.271-41.628zm155.96 131.37 5.04-63.23-0.825-67.44-28.341-61.617-50.189 44.085m232.26 149.12-35.525-27.355-20.626-137.55-45.797-7.376-39.937 12.645-11.842 28.047',
      output: 'm5.299 29.348 83.908 6.586 75.195 2.933-25.433 231.85-21.076 67.442-52.689 25.291-36.883-30.56 11.592-42.151 43.224-49.566 63.913-44.121 48.331-1.88 45.555 14.71 40.133 30.151 3.788 32.791-23.905 23.079-38.11 6.386-21.557-27.357 6.342-32.686 33.309-32.364 65.05-40.831 23.043-26.858m15.913 179.96 1.912-53.6-8.001-56.312-9.824-70.048-3.527-51.733-2.87-34.716m135.27 122.44 34.755-23.738 41.127-5.063 26.585 8.958 13.742 43.206-1.179 55.927-19.93 33.48-44.512 2.591-19.7-47.654 20.988-27.047 25.984-4.583 112.17-34.205m-309.08 32.188 48.829-22.618 38.756 15.522 3.04 50.92-3.86 59.588m32.285-137.47 34.755-23.738 41.127-5.063 26.585 8.958 13.742 43.206-1.179 55.927-19.93 33.48-44.512 2.591-19.7-47.654 20.988-27.047 25.984-4.583 112.17-34.205m-13.538 122.19 11.578-41.548 1.96-80.638 47.259-10.699 46.367 25.291-1.816 69.942-8.542 44.617m-572.15 42.958 77.173 29.63 17.915 55.85-48.475 71.601-38.559 0.304-25.598-44.506 6.199-45.313 88.01 38.39m5.473 12.818 43.889 53.924 2.107 24.056-62.98 53.62-45.313 6.323-56.39-5.053-51.343-14.152-11.61-37.563 5.547-58.493 11.721-85.728m263.18-46.224 9.627 58.528m-62.44 128.74 53.203-68.769 18.56-3.695 0.161 52.196 12.914 57.053 44.94 14.633 58.081-1.548 21.076-13.576 17.307-27.863-10.538-23.184-56.24-23.202-19.756-42.132 20.145-30.56 28.453-7.377 32.667 34.775m-5.269 68.496 57.389 25.203 38.99 2.898 30.56-20.791 11.591-29.506-30.348-21.609-38.148-19.488 5.269-34.775 20.022-24.238 36.259 6.754 18.809 10.401 111.6 63.153 43.377-7.53 12.646-34.774-12.646-35.829-40.044-10.538-49.528 30.56-10.537 54.797-7.377 49.528 23.183 35.828 42.152 6.323 45.313-18.968m-770.93 335.6-2.166-58.468-6.534-70.148 4.216-56.904v-20.022l63.227-14.753 64.281 59.012 8.215 49.528-28.345 26.506-33.828-8.611-17.45-33.218 26.845-35.24 44.743-39.028 23.022-21.576 43.918-1.607 18.237 40.67 3.146 101.65 5.284 64.85m-5.193-117.88 54.51-50.646 47.631-16.936 51.778 29.506 13.842 67.566-6.608 29.383-18.721 42.74-49.775 3.788-22.129-39.152 7.376-47.42 60.636-18.342 33.778-16.898 97.161-32.028 66.48-19.143 90.174-38.224m-215.66-10.535 10.308 71.481 16.885 82.119 21.95 30.221 54.885 7.883m1.985-222.32 13.673 152.02 28.33 31.588 34.413 16.531m154.61-154.47-51.428-14.724-34.652-2.15-35.302 12.358 4.904 42.224 26.183 26.721 28.452 17.753 16.861 37.937-42.152 18.968-47.635-9.377m284.76-115.67-49.646-32.299-33.867-9.237-27.092-0.934-39.382 28.433 5.368 41.601 49.367 22.129 30.721 25.291-22.291 29.506-24.237 16.861-83.91-15.269m194.97-106.08 34.953-38.971 31.598-0.886 15.094 23.028 2.439 46.057-19.86 54.913-32.626 20.371-37.953-1.771-18.271-41.628zm155.96 131.37 5.04-63.23-0.825-67.44-28.341-61.617-50.189 44.085m232.26 149.12-35.525-27.355-20.626-137.55-45.797-7.376-39.937 12.645-11.842 28.047',
      decimals: 4,
    };

    const min = 1;
    const max = 9999;

    this._handleWidthChange = (event) => {
      this.setState({width: event.target.value});
    }

    this._handleHeightChange = (event) => {
      this.setState({height: event.target.value});
    }
    
    this._handleDecimalsChange = (event) => {
      this.setState({decimals: event.target.value});
    }
    
    this._handlePathDataChange = (event) => {
      this.setState({input: event.target.value});
    }
    
    this._convertPathData = (input, inputWidth, inputHeight, inputDecimals) => {
      const width = Math.min(Math.max(Number(inputWidth), min), max);
      const height = Math.min(Math.max(Number(inputHeight), min), max);
      const decimals = Math.min(Math.max(Number(inputDecimals), 2), max);
      const output = SvgPath(input).iterate((segment) => {
        for (let i = 1; i < segment.length; i+=2) {
          const inputX = segment[i];
          const inputY = segment[i+1];
          const outputX = inputX / width;
          const outputY = inputY / height;
          segment[i] = outputX;
          segment[i+1] = outputY;
        }
      }).round(decimals).toString();
      if (output !== '') {
        return output;
      } else {
        return 'No valid input data!'
      }
    }

    this._onOutputClick = (event) => {
      document.getElementById('output').select();
      document.execCommand("copy");
    }
  }

  render() {
    return (
      <div {...appStyle}>
        <form {...formStyle}>
          <div {...inputContainerStyle}>
            <div {...inputStyle}>
            <header {...headerStyle}>
              <h1>Inline Clippath Converter</h1>
              <p>Converts SVG path data to range between 0 – 1.</p>
            </header>
              <label>Input width:</label>
              <input type='number' value={this.state.width} onChange={this._handleWidthChange} />
              <label>Input height:</label>
              <input type='number' value={this.state.height} onChange={this._handleHeightChange} />        
              <label>Input SVG path data:</label>
              <textarea onChange={this._handlePathDataChange} value={this.state.input}></textarea>
            </div>
          </div>
          <div {...outputContainerStyle}>
            <div {...outputStyle}>
              <label>Output decimals:</label>
              <input type='number' max='9' min='2' value={this.state.decimals} onChange={this._handleDecimalsChange}/>
              <label>Converted SVG path data (click to copy):</label>
              <textarea id='output' onClick={this._onOutputClick} readOnly='readonly' value={this._convertPathData(this.state.input, this.state.width, this.state.height, this.state.decimals)}></textarea>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;

css.global(
  'body', {
    background: '#ebebeb',
    margin: 0,
    padding: 0
  },
  
)

let appStyle = css({
  label: 'app',
  fontFamily: 'monospace',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
})

let headerStyle = css({
  label: 'header',
  fontSize: '1em',
  '@media (min-width: 640px)': {
    fontSize: '1.25em'
  }
})

let formStyle = css({
  label: 'form',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '& label': {
    label: 'label',
    display: 'block',
    margin: '1em 0 0.5em 0',
    fontWeight: 'bold'
  },
  '& input': {
    label: 'input',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '1.25em',
  },
  '& textarea': {
    label: 'textarea',
    width: '100%',
    minHeight: '8em',
    boxSizing: 'border-box',
  }
});

let inputContainerStyle = css({
  label: 'inputContainer',
  padding: '0 5%',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  minHeight: '50vh'
});

let outputContainerStyle = css({
  label: 'outputContainer',
  padding: '0 5%',
  background: '#ebffeb',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minHeight: '50vh'
});

let inputStyle = css({
  maxWidth: '960px',
  margin: '0 auto',
  marginBottom: '2em',
  flex: 1
});

let outputStyle = css({
  maxWidth: '960px',
  margin: '2em auto',
  flex: 1
});
