import React, { Component, Fragment } from 'react'
import Xgplayer from 'xgplayer-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Topbar from '../components/Topbar';
import API from '../API';
import 'swiper/swiper.scss';
// 样式
import './XGPlayer.css'
import BasicInfo from "./BasicInfo";
import Comment from "./Comment";
import {render} from "@testing-library/react";

// xgplayer设置
function config(idx, urlx, activex) {
  return {
    id: 'player' + idx,
    url: urlx,
    fluid: true,
    fitVideoSize: 'auto',
    videoInit: true,//封面图为视频首帧
    // volume: 0, //初始音量0，否则无法自动播放
    autoplay: activex, //自动播放
    loop: true, //循环播放
    controls: false,//关闭控制条
  }
}

let Player = [];
let playerId = 0;

// Swiper组件
class SwiperList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentVisible: false,
    };
    this.handleCommentOpen = this.handleCommentOpen.bind(this);
    this.handleCommentClose = this.handleCommentClose.bind(this);
  }

  componentDidMount() {
    console.log('111');
  }

  handleCommentOpen() {
    this.setState(() => ({ isCommentVisible: true }));
  }

  handleCommentClose() {
    this.setState(() => ({ isCommentVisible: false }));
  }

  render() {
    return (
      <Swiper
        spaceBetween={0} //间距
        slidesPerView={1} //同时显示几个
        // loop={true}
        direction={'vertical'}
        onSlideChangeTransitionEnd={(swiper)=>{//切换时先暂停所有，再播放当前
          for(let i=0; i<Player.length; i++) {
            Player[i].pause()
          }
          Player[swiper.activeIndex].play();
          this.props.changeVideo(swiper.activeIndex);
        }}
        onAfterInit={(swiper)=>{//自动播放第一个视频
          // Player[swiper.activeIndex].play();
        }}
      >
        {this.props.urls.map(x => {
          const videoInfo = this.props.urls[this.props.videoIndex];
          return (
            <SwiperSlide key={x[0]}>
              <Xgplayer config={config(x[0], x[5])} playerInit={(player) => { Player[playerId++] = player; }} />
              <div className="panel video-info">
                <BasicInfo
                  videoInfo={videoInfo}
                  handleCommentOpen={this.handleCommentOpen}
                />
                <Comment
                  videoComment={this.props.videoComment}
                  isCommentVisible={this.state.isCommentVisible}
                  handleCommentClose={this.handleCommentClose}
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    );
  }
}

class PlayerArea extends Component {
  constructor(props){
    super(props);
    this.state = {
      urlList:[],
      commentData: {},
      videoIndex: 0,
    }
    this.changeVideo = this.changeVideo.bind(this);
  }

  changeVideo(index) {
    this.setState(() => ({ videoIndex: index }));
  }

  componentDidMount() {
    API.getList().then(res => {
      this.setState(() => {
        const urlList = [];
        for(let i in res.data.data) {
          urlList.push(res.data.data[i]);
        }
        return { urlList };
      })
    }).catch(err => {
      console.warn(err)
    });

    API.getComment().then(res => {
      this.setState(() => {
        return { commentData: res.data.anw};
      });
    }).catch(err => {
      console.warn(err);
    });
  }
  render(){
    const urls = this.state.urlList;
    const videoIndex = this.state.videoIndex;
    const videoComment = this.state.commentData[urls[videoIndex]?.[0]];
    return this.state.urlList[0]?(
      <div className="video-container">
        <Topbar />
        <SwiperList
          urls={urls}
          videoIndex={videoIndex}
          videoComment={videoComment}
          changeVideo={this.changeVideo}
        />
      </div>
    ):(
      <div>loading</div>
    )
  }

}
export default PlayerArea;
