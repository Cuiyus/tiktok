import react, { Component, Fragment } from 'react';
import API from '../API';
import './BasicInfo.css';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    // const loveNum = this.props.videoInfo[3];
    // const commentNum = this.props.videoInfo[4];
    // const isLove = this.props.videoInfo[6];
    // console.log(loveNum, commentNum, isLove);
    this.state = {
      commentNum: 0,
    };
    this.handleLoveClick = this.handleLoveClick.bind(this);
    this.handleCommentOpen = this.handleCommentOpen.bind(this);
    this.handleFansClick = this.handleFansClick.bind(this);
    this.getCommentTotNum = this.getCommentTotNum.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getCommentTotNum(nextProps.videoInfo[0]);
  }

  getCommentTotNum(v_id) {
    API.getComTotal(v_id).then(res => {
      console.log(v_id, res.data.total);
      this.setState(() => {
        return ({
          commentNum: res.data.total,
        })
      });
    }).catch(err => {
      console.warn(err);
    });
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
    // const commentNum = this.props.videoInfo[4];
    return (
      <div className='right-info'>
        <div className="avatar">
          {/*<img src={this.props.videoInfo[2]} />*/}
          <div className="add-fans" onClick={this.handleFansClick}></div>
        </div>
        <div className="love-icon" onClick={this.handleLoveClick}>
          <i className="iconfont">&#xe8c3;</i>
          <br/>
          {loveNum}
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
