import React, { Component } from 'react';
import { Drawer } from "antd";
import API from '../API';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.videoComment);
    this.handleCommentClose = this.handleCommentClose.bind(this);
  }

  handleCommentClose() {
    this.props.handleCommentClose();
  }

  render() {
    return (
      this.props.isCommentVisible ?
        (
            <div className="comment-warp-box">
              <div className="comment-warp">
                <div className="comment-list">
                  <div className="comment-top">
                    <div className="number">11.0w评论</div>
                    <div className="close" onClick={this.handleCommentClose}><span>×</span></div>
                  </div>
                  <div className="comment-body">
                    <div className="comment-box">
                      <div className="comment-item">
                        <div className="user-pic">
                          <img src="https://7469-tiktok-2gdyda5xaa901b00-1259343309.tcb.qcloud.la/user_avatar/3.jpg?sign=2a34961be93f080066faf523e7f40ba6&t=1613620382" alt="" />
                        </div>
                        <div className="item-info">
                          <div className="reply">
                            <p className="name">栓蛋</p>
                            <p className="reply-des">栓蛋到此一游 <span className="time">02-18</span></p>
                          </div>
                          <div className="zan"> <span className="iconfont icon-aixin"><p className="zan-n">200</p></span></div>
                        </div>
                      </div>
                      <div className="sub-comment-item">
                        <div className="user-pic">
                          <img src="https://7469-tiktok-2gdyda5xaa901b00-1259343309.tcb.qcloud.la/user_avatar/3.jpg?sign=2a34961be93f080066faf523e7f40ba6&t=1613620382" alt="" />
                        </div>
                        <div className="item-info">
                          <div className="reply">
                            <p className="name">长妮</p>
                            <p className="reply-des">
                              <span>回复</span>
                              <span className="re-name">栓蛋:</span>
                              <span>啦啦啦</span>
                              <span className="time"> 02-18</span></p>
                          </div>
                          <div className="zan"> <span className="iconfont icon-aixin"><p>200</p></span></div>
                        </div>
                      </div>
                      <div className="more">-----------展开15条回复</div>
                    </div>
                  </div>
                  {/*评论框 */}
                  <div className="reply-input">
                    <input type="text" placeholder="留下你精彩的评论" />
                    <span className="emoji">@</span>
                    <span className="iconfont icon-shoucang"></span>
                  </div>
                </div>
              </div>
            </div>
        ) : null
    );
  }
}

export default Comment;
