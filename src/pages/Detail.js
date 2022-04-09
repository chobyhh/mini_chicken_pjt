import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import React, {useState} from 'react';
import { Image } from '../elements'
import { useParams } from "react-router-dom";


const Detail = (props) => {

    let [nickname, setNickName] = useState(['test1', 'test2', 'test3'])
    let [comment, setComment] = useState(['예시1', '예시2', '예시3'])
    let [menu, setMenu] = useState(['후라이드 치킨', '양념 치킨', '간장 치킨'])
    let [like_n, like_c] = useState([0,0,0])
    let [click, click_c] = useState(false)
    let [idx, idx_c] = useState(0)
    let [t_inp, t_inp_c] = useState([])
    let [d_inp, d_inp_c] = useState([])
    let [de_inp, de_inp_c] = useState([])

    const params = useParams();
    const list_idx = params.idx
    return (

        <div className="App">
          <Image />    
    
          {
            comment.map(function(a, i){
              return(
                <div><div className='list' key={i}>
                <h3 onClick={()=>{click_c(!click); idx_c(list_idx)}}> {nickname[list_idx]} <span style={{margin:"3px"}}>{menu[list_idx]}</span></h3>
                  <p> {comment[list_idx]} <span onClick={()=>{let copy = [...like_n]; copy[list_idx]++; like_c(copy)}}> 👍</span> {like_n[list_idx]} </p>
                <hr />
              </div></div>
              )
            })
            
          }
    
          
    
    
          {
            click === true ? <Modal nickname={nickname} menu={menu} comment={comment} idx={idx}/> : null
          }
    
          <div className='publish'>
            
            {/* <input placeholder='nick name' onChange={(e)=>{t_inp_c(e.target.value)}} style={{margin: "5px",height:'30px', textAlign:'high'}}/>  */}
            <select onChange={(e)=>{d_inp_c(e.target.value)}} style={{margin: "5px",height:'36px', width:'175px', textAlign:'high'}}>
                <option value="====================">===================</option>
                <option value="후라이드 치킨">후라이드 치킨</option>
                <option value="양념 치킨">양념 치킨</option>
                <option value="간장 치킨">간장 치킨</option>
                <option value="순살 치킨">순살 치킨</option>
            </select>          
            <input placeholder='comments' style={{margin: "5px",height:'30px', width:"70%", textAlign:'high'}} onChange={(e)=>{de_inp_c(e.target.value)}}></input>        
            <button style={{backgroundColor:"transparent",fontSize:"20px"}} onClick={()=>{
              var arrayCopy = [...nickname]
              arrayCopy.push(t_inp)
              setNickName(arrayCopy)
              
              var arrayCopy2 = [...menu]
              arrayCopy2.push(d_inp)
              setMenu(arrayCopy2)
    
              var arrayCopy3 = [...nickname]
              arrayCopy3.push(de_inp)
              setComment(arrayCopy3)
    
              ;}}>
              글 작성
            </button>
          </div>
    
        </div>
      );
    }
    
    function Modal(props, i){
      return(
        <div className='modal'>
          <h2>{props.nickname[props.idx]}</h2>
          <p>{props.menu[props.idx]}</p>
          <p>{props.comment[props.idx]}</p>
        </div>
      )
    }
    
    

export default Detail;