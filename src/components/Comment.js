import React, { Component } from 'react';
import { Drawer } from "antd";
import API from '../API';
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCommentClose = this.handleCommentClose.bind(this);
  }

  handleCommentClose() {
    this.props.handleCommentClose();
  }

  render() {
    const { isCommentVisible } = this.props;
    return (
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
        zIndex={3}
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
  }
}

export default Comment;
