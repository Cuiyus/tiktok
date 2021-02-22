// UncontrolledLottie.jsx
import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './follow.json'
 
class UncontrolledLottie extends Component {

    state = {isStopped1: true, isPaused1: true}
   
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
        <div className="controlled" onClick = {() => this.setState({isStopped1: false, isPaused1: false })}>
          <Lottie options={defaultOptions}
                height={28}
                width={60}
                isStopped={this.state.isStopped1}
                isPaused={this.state.isPaused1}
          />
        </div>
      )
    }
  }
   
export default UncontrolledLottie
