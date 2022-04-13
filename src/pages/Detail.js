import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators } from '../redux/modules/postt';
import { actionCreators as commentActions } from '../redux/modules/comment';
import Comments from '../components/Comments';
import CommentWrite from '../components/CommentWrite';
import { DetailImg } from '../elements';
import { useParams } from "react-router-dom";
import Menu from '../components/Menu';
// import Permit from '../shared/Permit';

const PostDetail = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const params = useParams();
  const list_id = params.id

  const post_list = useSelector((state) => state.post.list);
  const brand_list = post_list.restaurants
  console.log("브랜드 네임",brand_list[list_id].restaurantTitle)

  React.useEffect(() => {
    dispatch(actionCreators.getPostMD());
  }, [dispatch]);

  return (
    <>
      <div style={{display: "flex", margin:"5px", justifyContent: "space-between"}}>
        <DetailImg src={brand_list ? brand_list[list_id].restaurantImg : ""}/>
        <h2 style={{position:"absolute", marginLeft:"610px", marginTop:"95px"}}>
          <span> {brand_list[list_id].restaurantTitle}치킨 </span> 
           메뉴판
        </h2>
        <Menu style={{height:"100px"}} />

        
      </div>
        
      
      <CommentWrap>
        <CommentWrite post_id={id}/>
        <Comments post_id={id}/> 
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default PostDetail;