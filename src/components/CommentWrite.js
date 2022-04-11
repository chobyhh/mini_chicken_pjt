import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Input, Button, WriteInput } from '../elements';
import { actionCreators as commentActions } from '../redux/modules/comment';

import { useParams } from "react-router-dom";


const CommentWrite = (props) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [is_login, setIsLogin] = useState(true);
  
  
  const params = useParams();
  const list_id = params.id

  const menu_list = useSelector((store) => store.post.logo[list_id].menu);
  
  
  //const is_login = useSelector(state => state.user.isLogin);


  const writeComment = () => {
    if(!is_login) {
      window.alert("로그인 후 이용 가능합니다!")
      return
    }
    
    if(!comment){
      window.alert("댓글을 입력해주세요!")
      return;
    }
    dispatch(commentActions.addCommentDB(props.post_id, comment));
  }

  return (
    <>
      <WriteWrap>
        <CommentSelect>
            {
                menu_list.map((e, i) => (
                    <option
					    key={i}
					    value={e.name}
					    defaultValue={props.defaultValue === e.name}
				    >
					{e.name}
				    </option> 
             ))
            }
        </CommentSelect>
        <CommentInput 
          placeholder="댓글을 입력해주세요!" 
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Button 
          width="80px"
          _onClick={() => {
            writeComment();
            setComment("");
          }}
        >
          작성
        </Button>
      </WriteWrap>
    </>
  );
};

const WriteWrap = styled.div`
  margin: 0 auto;
  margin-bottom: 12px;
  width: 100%;
  max-width: 980px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CommentSelect = styled.select`
  padding: 0px 10px ;
  width: 25%;
  height: 42px;
  border: 1px solid #c9c9c9;
  border-radius: 20px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid #c9c9c9;
    border-radius: 20px;
  }
`;

const CommentInput = styled.input`
  padding: 0px 10px ;
  width: 100%;
  height: 42px;
  border: 1px solid #c9c9c9;
  border-radius: 20px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid #c9c9c9;
    border-radius: 20px;
  }
`;

export default CommentWrite;