import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button } from '../elements'
import { actionCreators } from '../redux/modules/postt';
import { actionCreators as commentActions } from '../redux/modules/comment';
import Comments from '../components/Comments';
import CommentWrite from '../components/CommentWrite';
import { DetailImg } from '../elements';
import { useParams } from "react-router-dom";
import Menu from '../components/Menu';
// import Permit from '../shared/Permit';

const Detail = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const params = useParams();
  const list_id = params.id

  console.log("URL확인",list_id)

  const post_list = useSelector((state) => state.post.list);
  const brand_list = post_list.restaurants
 

  React.useEffect(() => {
    dispatch(actionCreators.getPostMD());
  }, [dispatch]);
  
  React.useEffect(() => {
    const nickname = localStorage.getItem('nickname');
  });

  return (
    <>
      <div style={{display: "flex", margin:"5px", justifyContent: "space-between", paddingLeft:"30px"}}>
        <DetailImg src={brand_list ? brand_list[list_id].restaurantImg : ""}/>
        
        <Menu style={{height:"100px"}} />

        
      </div>
      <hr style={{marginTop:"5%",marginBottom:"5%", border:"5px double #EC524B"}}>
      </hr>  
      <CommentWrite post_id={id}/>
      <CommentWrap>
        
          {/* <div style={{display:"flex",borderBottom:"3px solid #EC524B"}}> */}
          <div>
            
          </div>
          <div style={{display:"flex",borderBottom:"2px solid #aaaaaa"}}>
            <p style={{marginLeft:"3%"}}><Text size="25px">Nickname</Text></p>
            <p style={{marginLeft:"13%"}}><Text size="25px">Menu</Text></p>
            <p style={{marginLeft:"36%"}}><Text size="25px">Comment</Text></p>
          </div>
         
        <Comments post_id={id}/> 
      </CommentWrap>
    </>
  );
};

const CommentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
`;

export default Detail;