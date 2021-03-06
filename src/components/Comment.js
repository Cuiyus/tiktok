import React, { Component } from 'react';
import API from '../API';
import './Comment.css';
import UncontrolledLottie from './Comment_Heart';
import UncontrolledLottie1 from './UncontrolledLottie1';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputComment: '',
      commentNum: 0,
    };
    this.handleCommentClose = this.handleCommentClose.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleInput = this.handleInput.bind(this);
    // this.getCommentTotNum = this.getCommentTotNum.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.getCommentTotNum(nextProps.videoInfo[0]);
  // }

  handleInput(event) {
    const inputValue = event.target.value;
    this.setState(() => {
      return ({
        inputComment: inputValue,
      });
    });
  }

  handleCommentClose() {
    this.props.handleCommentClose();
  }

  handleSubmitComment() {
    const { videoInfo } = this.props;
    const _id = videoInfo[0];
    const user_id = videoInfo[1];
    const v_com = this.state.inputComment;
    API.wirteVideoCom(_id, user_id, v_com).then(res => {
      console.log(res);
      this.props.updateComment(this.props.videoInfo[0]);
      // this.getCommentTotNum(this.props.videoInfo[0]);
    }).catch(err => {
      console.warn(err);
    });
    this.setState(() => {
      return ({
        inputComment: '',
      });
    });
  }

  // getCommentTotNum(v_id) {
  //   API.getComTotal(v_id).then(res => {
  //     console.log(v_id, res.data.total);
  //     this.setState(() => {
  //       return ({
  //         commentNum: res.data.total,
  //       })
  //     });
  //   }).catch(err => {
  //     console.warn(err);
  //   });
  // }

  render() {
    const comments = [];
    for(let i in this.props.videoComment) {
      comments.push(this.props.videoComment[i]);
    }
    return (
<<<<<<< HEAD
      <div>
        <Drawer
        open={isCommentVisible}
      />
      <Drawer
        className="comment-wrap"
        title="Comment"
        placement="bottom"
        closable={true}
        onClose={this.handleCommentClose}
        visible={isCommentVisible}
        zIndex={100}
      >
      </Drawer>
      </div>
      
    );
    // const { isCommentVisible } = this.props;
    const visibleControl = isCommentVisible ? { top: '30vh' } : { top: '100vh' };
    return (
      <div
        className="comment-wrap"
        style={visibleControl}
      >
    
      </div>
    );
=======
      this.props.isCommentVisible ?
        (
          <div className="comment-warp-box">
            <div className="comment-warp">
              <div className="comment-list">
                <div className="comment-top">
                  <div className="number">{ this.props.videoInfo[4] } 条评论</div>
                  <div className="close" onClick={this.handleCommentClose}><span>×</span></div>
                </div>
                <div className="comment-body">
                  {comments.map(comment => {
                    const subComments = [];
                    for(let i in comment[3]) {
                      subComments.push(comment[3][i]);
                    }
                    // console.log(subComments);
                    return (

                      <div className="comment-box" key={ comment[0] + comment[1] +comment[2] }>
                        <div className="comment-item">
                          <div className="user-pic">
                            <img src={ comment[4] } />
                          </div>
                          <div className="item-info">
                            <div className="reply">
                              <p className="name">{ comment[0] }</p>
                              <p className="reply-des">{ comment[1] } <br></br><span className="time">{ comment[2] }</span></p>
                            </div>
                            <div className="zan"> 
                            <div className="love"><UncontrolledLottie /> </div>
                            {/*<span className="iconfont icon-aixin">*/}
                            <p className="zan-n">{ comment[5] }</p>
                            {/*</span>*/}</div>
                          </div>
                        </div>

                        {/* 子评论 */}
                        {
                          subComments.map(subComment => {
                            return (
                              <div className="sub-comment-item" key={ subComment[0] + subComment[1] + subComment[2] }>
                                <div className="user-pic">
                                  <img
                                    src={ subComment[4] }
                                  />
                                </div>
                                <div className="item-info">
                                  <div className="reply">
                                    <p className="name">{ subComment[0] }</p>
                                    <p className="reply-des">
                                      {/*<span>回复</span>
                                      <span className="re-name">{ comment[0] }:</span>*/}
                                      <span>{ subComment[1] }</span>
                                      <br></br>
                                      <span className="time">{subComment[2].slice(5,10)}</span></p>
                                  </div>
                                  <div className="zan">{/*<span className="iconfont icon-aixin">*/}<div className="love"><UncontrolledLottie /> </div><p className="zan-n">{subComment[3]}</p>{/*</span>*/}</div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    )
                  })}
                </div>
                {/*评论框 */}
                <div className="reply-input">
                  <input
                    type="text" placeholder="留下你精彩的评论"
                    value={this.state.inputComment}
                    onChange={(event) => this.handleInput(event)}
                  />
                  <span className="emoji">@</span>
                  {/*<span className="iconfont icon-shoucang"></span>*/}
                  <span onClick={this.handleSubmitComment}>发送</span>
                </div>
              </div>
            </div>
          </div>
        ) : null
    );
>>>>>>> developer
  }
}

export default Comment;
