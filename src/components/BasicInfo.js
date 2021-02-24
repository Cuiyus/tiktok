import react, { Component, Fragment } from 'react';
import API from '../API';
import './BasicInfo.css';
import Iconfont from "./iconfont"
<<<<<<< HEAD

let img={
  "width":"100%",
  "height":"100%",
  "display":"inline-block",
  "borderRadius":"50%"
}
=======
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
>>>>>>> developer

class BasicInfo extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    // console.log("props = ",props);
    const headUrl=this.props.videoInfo[2];
    // 头像链接
    const loveNum = this.props.videoInfo[3];
    const commentNum = this.props.videoInfo[4];
    const isLove = this.props.videoInfo[6];
    this.state = {
      loveNum,
      commentNum,
      isLove,
      headUrl
    };
=======
    this.state = {};
>>>>>>> developer
    this.handleLoveClick = this.handleLoveClick.bind(this);
    this.handleCommentOpen = this.handleCommentOpen.bind(this);
    this.handleFansClick = this.handleFansClick.bind(this);
    // this.getCommentTotNum = this.getCommentTotNum.bind(this);
  }

<<<<<<< HEAD
  static getDerivedStateFromProps(nextProps, state){
    // console.log("props = ",nextProps);
    // // console.log("----------");
    // console.log("state = ",state);
    // // console.log("----------");\
    // console.log("111111");
    // console.log("this = ",this);
    // let headUrl=nextProps.videoInfo[2];
    // let loveNum = nextProps.videoInfo[3];
    // this.state.commentNum = nextProps.videoInfo[4];
    // this.state.isLove = nextProps.videoInfo[6];
    // this.state.headUrl=nextProps.videoInfo[2];
    // this.state.loveNum = nextProps.videoInfo[3];
    // this.state.commentNum = nextProps.videoInfo[4];
    // this.state.isLove = nextProps.videoInfo[6];
    return {
      headUrl:nextProps.videoInfo[2],
      loveNum:nextProps.videoInfo[3],
      commentNum:nextProps.videoInfo[4],
      isLove:nextProps.videoInfo[6]
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    // console.log("nextProps = ",nextProps);
    // console.log("-------------");
    // console.log("nextState = ",nextState);
    // console.log("-------------");
    // console.log("222222222");
    // this.state.headUrl=nextProps.videoInfo[2];
    // this.state.loveNum = nextProps.videoInfo[3];
    // this.state.commentNum = nextProps.videoInfo[4];
    // this.state.isLove = nextProps.videoInfo[6];
    // console.log("nextProps = ",nextProps);
    // console.log("nextState = ",nextState);
    return true;
  }

  componentDidUpdate(){
    // console.log("props = ",this.props)
    // console.log("this.state = ",this.state)
    // console.log("this = ");
    // this.isMounted()
    // this.constructor();
    // console.log("props = ",this.props);
    // this.state.headUrl=this.props.videoInfo[2];
    // this.state.loveNum = this.props.videoInfo[3];
    // this.state.commentNum = this.props.videoInfo[4];
    // this.state.isLove = this.props.videoInfo[6];
  }
=======

>>>>>>> developer

  handleLoveClick() {
    this.state.loveNum=parseInt(this.state.loveNum)+1;
    console.log("this.state.loveNum = ",this.state.loveNum);
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
<<<<<<< HEAD
      <div className='right-info'>
        <div className="avatar" onClick={this.handleFansClick}>
             <img src={this.state.headUrl} alt="不好意思" id="img" style={img}></img>
        </div>
        <div className="love-icon" style={{color:"white"}} onClick={this.handleLoveClick}>
          {/* <i className="iconfont">&#xe8c3;</i> */}
          <Iconfont type="icon-aixin-copy-copy" style={{fontSize:"45px"}}/>
          <br/>
          {this.state.loveNum}
=======
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
>>>>>>> developer
        </div>
        <div className="comment-icon" style={commenticon} onClick={this.handleCommentOpen}>
          <i className="iconfont">&#xe63a;</i>
          <br/>
          {commentNum}
        </div>
<<<<<<< HEAD
        <div className="share-icon">
=======
        <div className="share-icon" style={shareicon}>
>>>>>>> developer
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
