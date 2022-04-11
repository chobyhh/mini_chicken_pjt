import React, { useState } from 'react';
import styled from 'styled-components';
import { Image, DetailImg } from '../elements'
import { useParams } from "react-router-dom";
import {history} from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from '../redux/modules/postt';

const Detail = () => {

    const params = useParams();
    const list_id = params.id
        console.log("인덱스",list_id)

    const post_list = useSelector((state) => state.post.list);
    //이부분이 데이터가 없어서 catch 에러가 떴던겁니다.

    const brand_list = post_list.restaurants
    // const logo = brand_list[list_id]

    // console.log("로고",logo)
    // 이렇게 데이터가 있는 restaurants라는 배열로 들어가면서 해결이 되었으나
    // 다른 문제로 새로고침을 하면 데이터가 다 사라지는 현상이 발생함
    // 아래 옵셔널 체이닝 문제였고 brand_list ? 이 물음표를 써주니 문제해결
    console.log("포스트",post_list.restaurants);
    console.log("메뉴",brand_list);
    const dispatch = useDispatch();
  
    React.useEffect(() => {
      dispatch(actionCreators.getPostMD());
    }, []);
  
    
    return (
      <>
        <DetailImg src={brand_list ? brand_list[list_id].restaurantImg : ""}/>
      </>
      
        // <PostListWrap>
        //     {
        //     brand_list?.map((e,i)=>{
        //         // console.log("로고 인덱스",logo[i])   
        //         return(
        //             <div onClick={()=>{history.push("/restaurants/"+i)}} key={i}>
        //                 <Image src={e.restaurantImg}/>
        //             </div>
        //         )
        //     })
        // }
        // </PostListWrap>
    );
};


// function Brand(props){
//     return(
//         <div>
//             <Image width="100%" height="100%" src={props.brand.bimg} />
//         </div>
//     )
// }

const PostListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  gap: 20px;
  margin-top : 50px;
  padding : 5px;
`



export default Detail;