import react, { Component, Fragment } from 'react';
import API from '../API';
import './BasicInfo.css';
import Iconfont from "./iconfont"
import UncontrolledLottie from './UncontrolledLottie';
import UncontrolledLottie1 from './UncontrolledLottie1';
let img={
    "width":"55px",
    "height":"55px",
    "display":"inline-block",
    "borderRadius":"50%",
    "backgrounColor":"red",
    "position":"relative",
    "top":"0px",
    "left":"-8px",
  }
  
  
  let headimg = {
    // "position":"relative",
    // "top":"-12px",
    // "left":"-4px",
    "display":"inline-block",
    "width":"100%",
    "height":"100%",
    "borderRadius":"50%",
    
  }
  
  let loveicon = {
    "position":"relative",
    "left":"-7px",
    "color":"white",
    "top":"2px"
  }
  
  let commenticon = {
    "position":"relative",
    "left":"-7px",
    "top":"2px"
  }
  
  let shareicon = {
    "position":"relative",
    "left":"-7px"
  }

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLoveClick = this.handleLoveClick.bind(this);
    this.handleCommentOpen = this.handleCommentOpen.bind(this);
    this.handleFansClick = this.handleFansClick.bind(this);
    // this.getCommentTotNum = this.getCommentTotNum.bind(this);
  }



  handleLoveClick() {
    const { videoInfo } = this.props;
    console.log(videoInfo);
    if(videoInfo[6]) {
      API.cancelAttentions(videoInfo[0], videoInfo[1]).then(res => {
        // console.log(res, 'APICancelAttentions');
        this.props.handleChangeLoveNum(res.data.atte_n, false);
      }).catch(err => {
        console.warn(err);
      });
    }
    else {
      API.getAttention(videoInfo[0], videoInfo[1]).then(res => {
        // console.log(res, 'APIGetAttention');
        this.props.handleChangeLoveNum(res.data.atte_n, true);
      }).catch(err => {
        console.warn(err);
      });
    }
  }

  handleFansClick() {
    const { videoInfo } = this.props;
    API.getFans(videoInfo[0], videoInfo[1]).then(res => {
      console.log(res);
    }).catch(err => {
      console.warn(err);
    });
  }

  handleCommentOpen() {
    this.props.handleCommentOpen();
  }

  render() {
    // console.log(this.props.videoInfo);
    const loveNum = this.props.videoInfo[3];
    const commentNum = this.props.videoInfo[4];
    return (
      <div className='right-info'  style={{fontSize:"15px"}}>
        <div className="avatar" style={img}>
          <img src={this.props.videoInfo[2]} style={headimg} />
          <div className="follow" style={{marginRight:"15px"}}>
            <UncontrolledLottie1 />
            </div>
          {/* <div className="add-fans" onClick={this.handleFansClick}></div> */}
        </div>
        <div className="love-icon" style={loveicon} onClick={this.handleLoveClick}>
          {/* <i className="iconfont">&#xe8c3;</i> 
          <Iconfont type="icon-aixin-copy-copy" style={{fontSize:"45px"}}/>

          */}
          
          <div className="iconfont">
            <div className="love1">
            <UncontrolledLottie />
            </div>
          </div> 
          {loveNum}
        </div>
        <div className="comment-icon" style={commenticon} onClick={this.handleCommentOpen}>
          <i className="iconfont">&#xe63a;</i>
          <br/>
          {commentNum}
        </div>
        <div className="share-icon" style={shareicon}>
          {/* <i className="iconfont">&#xe63e;</i> */}
          <Iconfont type="icon-tubiao_jiemian_douyinzhuanfa-copy" style={{fontSize:"45px"}}/>
          <br/>
          <span>分享</span>
        </div>
      </div>
    );
  }
}

export default BasicInfo;
