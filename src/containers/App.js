import React, { Component } from 'react';
import XGPlayer from '../components/XGPlayer';
import BasicInfo from '../components/BasicInfo';
import Comment from '../components/Comment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <XGPlayer />
        </header>
      </div>
    );
  }
}

export default App;
