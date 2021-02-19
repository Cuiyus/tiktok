import React, { Component } from 'react';
import axios from "axios"
import Iconfont from "./iconfont"

    let bottom = {
    "backgroundColor":"black",
    "display":"flex",
    "flexDirection":"row",
    "justifyContent":"space-between",
    "position":"fixed",
    "bottom":"0px",
    "left":"0px",
    "width":"100%",
    "height":"45px",
    "zIndex":"100"
    };
    let iconfont={
        "fontSize":"35px",
        "position":"relative",
        "top":"-4px"
    }
    let bottombar={
        "color":"#99a9bfda",
        "width":"20%",
        "textAlign":"center",
        "position":"relative",
        "top":"10px",
        "fontSize":"16px"
    }

class index extends Component {
    componentDidMount(){
        let btm = document.getElementById("btm_0");
        // console.log("btm = ",btm);
        btm.style.color="white";
    }
    render() {
        function printf(index){
            // axios.get("http://localhost:3000/api/getHomeInfo")
            // .then((value) => {
            //     console.log("value = ",value.data);
            // })
            // .catch((err) => {})
            for(let i=0;i<5;i++){
                let btm = document.getElementById("btm_"+i);
                if(i!==index){
                    btm.style.color="#99a9bfda";
                }else{
                    btm.style.color="white";
                    let size=parseInt(btm.style.fontSize);
                    btm.style.fontSize=`${size+0.5}px`;
                    btm.style.transition="font-size 0.2s"
                    setTimeout(() => {
                        btm.style.fontSize=`${size}px`;
                        btm.style.transition="font-size 0.1s"
                    }, 200);
                    
                }
            }
        }
        let arr=["首页","朋友","","消息","我"]
        let item=[];
        for(let i=0;i<arr.length;i++){
            if(i===2){
                item.push(<div className="bottombar" id={"btm_"+i} key={i} onClick={()=>printf(i)} style={bottombar}><Iconfont type="icon-guanzhu-copy" style={iconfont}/></div>)
            }else{
                item.push(<div className="bottombar" id={"btm_"+i} key={i} onClick={()=>printf(i)} style={bottombar}>{arr[i]}</div>)
            }
        }
        return (
            <div className="bottom" style={bottom}>
                {item}
            </div>
        );
        
    }
}

export default index;