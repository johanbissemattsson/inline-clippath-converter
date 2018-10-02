import React, { Component } from 'react';
import { css } from 'glamor'
import SvgPath from 'svgpath'
import ReactHtmlParser from 'react-html-parser';
import { filter } from 'lodash'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '1440',
      height: '900',
      input: '',
      output: '',
      decimals: 4,
    };

    const min = 1;
    const max = 9999;
    const tabSpaces = '  ';

    this._handleWidthChange = (event) => {
      this.setState({width: event.target.value});
    }

    this._handleHeightChange = (event) => {
      this.setState({height: event.target.value});
    }
    
    this._handleDecimalsChange = (event) => {
      let value = event.target.value;
      if (value > 9) {
        value = 9;
      }
      this.setState({decimals: value});
    }
    
    this._handlePathDataChange = (event) => {
      this.setState({input: event.target.value});
    }

    this._tabs = (size) => {
      let tabs = '';
      let i = 0;
      for (i = 0; i < size; i++) { 
        tabs += tabSpaces;
      } 
      return tabs;
    }

    this._filterClipPaths = (children) => filter(children, ((childItem) => {
      return (React.isValidElement(childItem) && childItem.type === 'clippath')
    }));

    this._filterDefs = (children) => filter(children, ((childItem) => {
      return (React.isValidElement(childItem) && childItem.type === 'defs')
    }));

    this._convertPath = (input, width, height, decimals) => {
      const convertedPath = SvgPath(input).iterate((segment) => {
      for (let i = 1; i < segment.length; i+=2) {
        const inputX = segment[i];
        const inputY = segment[i+1];
        const outputX = inputX / width;
        const outputY = inputY / height;
        segment[i] = outputX;
        segment[i+1] = outputY;
      }
    }).round(decimals).toString()
    return convertedPath;
  };
    
    this._convertData = (input, inputWidth, inputHeight, inputDecimals) => {
      const width = Math.min(Math.max(Number(inputWidth), min), max);
      const height = Math.min(Math.max(Number(inputHeight), min), max);
      const decimals = Math.min(Math.max(Number(inputDecimals), 2), max);

      if (this.state.input.startsWith('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!-- Created with Inkscape (http://www.inkscape.org/) -->')) {
        return ReactHtmlParser(this.state.input).map((item) => {
          if (React.isValidElement(item) && item.type === 'svg') {
            const svgWidth = item.props.width;
            const svgHeight = item.props.height;
            const defs = this._filterDefs(item.props.children);
            if (defs.length !== 0 && defs[0].props && defs[0].props.children.length !== 0) {
              const clippaths = this._filterClipPaths(defs[0].props.children);
              if (clippaths.length !== 0) {
                return (
                  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">\n' + 
                  this._tabs(1) + '<defs>\n' +
                    clippaths.map((clippathItem) => {
                      const paths = filter(clippathItem.props.children, ((clippathItemChild) => {
                        return (React.isValidElement(clippathItemChild) && clippathItemChild.type === 'path')
                      }));
                      return (
                      this._tabs(2) + '<clipPath id="' + clippathItem.props.id + '" clipPathUnits="objectBoundingBox">\n' +
                        paths.map((pathItem ) => this._tabs(3) + '<path d="' + this._convertPath(pathItem.props.d, svgWidth ? svgWidth : width, svgHeight ? svgHeight : height, decimals) + '"/>\n') +
                      this._tabs(2) + '</clipPath>\n'
                      )}).join('') + 
                  this._tabs(1) + '</defs>\n' +
                  '</svg>\n'
                );
              }
            }
          }
        return ('')}).join('');
      } else {
          const output = this._convertPath(input, width, height, decimals)
          if (output !== '') {
            return output;
          } else {
            return 'No valid input data!'
          }
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
              <small>(skipped if copied SVG already has width and height attributes)</small>
              <label>Input height:</label>
              <input type='number' value={this.state.height} onChange={this._handleHeightChange} />        
              <small>(skipped if copied SVG already has width and height attributes)</small>
              <label>Input SVG path data:</label>
              <textarea onChange={this._handlePathDataChange} value={this.state.input} placeholder='m333 123 314.123 101...'></textarea>
            </div>
          </div>
          <div {...outputContainerStyle}>
            <div {...outputStyle}>
              <label>Output decimals:</label>
              <input type='number' max='9' min='2' value={this.state.decimals} onChange={this._handleDecimalsChange}/>
              <label>Converted SVG path data (click to copy):</label>
              <textarea id='output' onClick={this._onOutputClick} readOnly='readonly' value={this._convertData(this.state.input, this.state.width, this.state.height, this.state.decimals)}></textarea>
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
  fontSize: '0.75em',
  '@media (min-width: 640px)': {
    fontSize: '1em'
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
  },
  '& small': {
    label: 'small',
    opacity: 0.33
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
  margin: '2em auto 6em auto',
  flex: 1
});

/*
<svg xmlns="http://www.w3.org/2000/svg" class="clippath" viewBox="0 0 1 1">
  <defs>
    <clipPath id="clippath-konstfack">
      <path d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z"/>
    </clipPath>
  </defs>
</svg>
*/