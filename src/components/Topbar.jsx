import React, { Component } from 'react';

let top = {
  "color":"red",
  "display":"flex",
  "flexDirection":"row",
  "justifyContent":"space-between",
  // "background":"transparent",
  // 组件合并之后该注释取消
  "background":"#f7f1f1b2"
  // 设置这个属性是方便于调试顶部导航栏，组件合并之后此属性删除
};
let topbar={
  "color":"#c5bfbfef",
  "height":"40px",
  "width":"20%",
  "textAlign":"center",
  "position":"relative",
  "top":"6px",
  "fontSize":"17px"
}

let line={
  "width":"100%",
  "height":"3px",
  "position":"relative",
  "top":"-8px"
}

let line_child={
  "width":"7%",
  "height":"100%",
  "background":"white",
  "marginLeft":"66%"
}

class Topbar extends Component {

  render() {
    function swap(index){
      for(let i=0;i<5;i++){
        let top=document.getElementById("top_"+i);
        if(i===index&&i!==0&&i!==4){
          top.style.color="white";
          let child=document.getElementById("line_child");
          let left=parseInt(child.style.marginLeft);
          let total;
          if(i===1){
            total=26;
          }else if(i===2){
            total=46;
          }else if(i===3){
            total=66;
          }
          if(total>left){
            let inval = setInterval(() => {
              left++;
              child.style.marginLeft=`${left}%`;
              if(left===total){
                clearInterval(inval);
              }
            }, 10);
          }else if(total<left){
            let inval = setInterval(() => {
              left--;
              child.style.marginLeft=`${left}%`
              if(left===total){
                clearInterval(inval);
              }
            }, 10);
          }
        }else{
          top.style.color="#c5bfbfef";
        }
      }
    }
    let arr=["直播","地方","关注","推荐","搜索"];
    let item=[];
    for(let i=0;i<arr.length;i++){
      item.push(<div className="topbar" id={"top_"+i} key={i} onClick={()=>swap(i)} style={topbar}>{arr[i]}</div>)
    }
    return (
       <div>
        <div className="top" style={top}>
        {item}
       </div>
        <div id="line" style={line}>
          <div id="line_child" style={line_child}></div>
        </div>
       </div>
    );
  }
}

export default Topbar;