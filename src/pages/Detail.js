import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { actionCreators } from '../redux/modules/postt';
import { actionCreators as commentActions } from '../redux/modules/comment';
import Comments from '../components/Comments';
import CommentWrite from '../components/CommentWrite';
import { DetailImg } from '../elements';
import { useParams } from "react-router-dom";
// import Permit from '../shared/Permit';

const PostDetail = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const params = useParams();
  const list_id = params.id

  const post_list = useSelector((state) => state.post.list);
  const brand_list = post_list.restaurants


  React.useEffect(() => {
    dispatch(actionCreators.getPostMD());
  }, [dispatch]);

  return (
    <>
      {
        <DetailImg src={brand_list ? brand_list[list_id].restaurantImg : ""}
        />
      }
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