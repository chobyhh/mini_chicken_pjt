import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { actionCreators as commentActions } from '../redux/modules/comment';
import CommentItem from './CommentItem';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const list_id = params.id
        // console.log("인덱스",list_id)
        
    const comment_list = useSelector(state => state.comment.list);
    const brand_list = useSelector(state => state.post.list.restaurants);
    const user = useSelector(state => state.user.user)
    console.log("user",user.nickname)
    // console.log("뭐가 찍히는거지?",comment_list.commentDb)

    useEffect(() => {
      dispatch(commentActions.getCommentDB(brand_list ? brand_list[list_id].restaurantTitle : ""));
    }, [brand_list, dispatch, list_id]);
  
    return (
      <>
        {comment_list &&
          comment_list.commentDb?.map((c, idx) => {
            return (
            <CommentItem key={idx} {...c} />
            );
          })
        }
      </>
    );
  };
  
  export default CommentList;