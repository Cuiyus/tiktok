import react, { Component, Fragment } from 'react';
import API from '../API';
import './BasicInfo.css';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    const loveNum = this.props.videoInfo[3];
    const commentNum = this.props.videoInfo[4];
    const isLove = this.props.videoInfo[6];
    this.state = {
      loveNum,
      commentNum,
      isLove,
    };
    this.handleLoveClick = this.handleLoveClick.bind(this);
    this.handleCommentOpen = this.handleCommentOpen.bind(this);
    this.handleFansClick = this.handleFansClick.bind(this);
  }

  handleLoveClick() {
    const { videoInfo } = this.props;
    if(this.state.isLove) {
      API.cancelAttentions(videoInfo[0], videoInfo[1]).then(res => {
        console.log(res, 'APICancelAttentions');
        this.setState(() => ({
          loveNum: res.data.atte_n,
          isLove: false,
        }));
      }).catch(err => {
        console.warn(err);
      });
    }
    else {
      API.getAttention(videoInfo[0], videoInfo[1]).then(res => {
        console.log(res, 'APIGetAttention');
        this.setState(() => ({
          loveNum: res.data.atte_n,
          isLove: true,
        }));
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
    return (
      <div className='right-info'>
        <div className="avatar">
          {/*<img src=""></img>*/}
          <div className="add-fans" onClick={this.handleFansClick}></div>
        </div>
        <div className="love-icon" onClick={this.handleLoveClick}>
          <i className="iconfont">&#xe8c3;</i>
          <br/>
          {this.state.loveNum}
        </div>
        <div className="comment-icon" onClick={this.handleCommentOpen}>
          <i className="iconfont">&#xe63a;</i>
          <br/>
          {this.state.commentNum}
        </div>
        <div className="share-icon">
          <i className="iconfont">&#xe63e;</i>
          <br/>
          <span>分享</span>
        </div>
      </div>
    );
  }
}

export default BasicInfo;
