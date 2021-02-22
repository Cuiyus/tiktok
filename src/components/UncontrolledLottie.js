// UncontrolledLottie.jsx
import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './Heart5.json'
 
class UncontrolledLottie extends Component {

    state = {isStopped: true, isPaused: true}
   
    render(){
      
   
      const defaultOptions = {
        loop: false,
        autoplay: false, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
   
      return(
        <div className="controlled" onClick = {() => this.setState({isStopped: false, isPaused: false })}>
          <Lottie options={defaultOptions}
                height={80}
                width={280}
                isStopped={this.state.isStopped}
                isPaused={this.state.isPaused}
          />
        </div>
      )
    }
  }
   
export default UncontrolledLottie
