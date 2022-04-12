import React, { useState, Component, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Input, Button, WriteInput } from '../elements';
import { actionCreators as commentActions } from '../redux/modules/comment';



const CommentWrite = (props) => {
  const dispatch = useDispatch();


  const [comment, setComment] = useState([{
    menu:"", 
    comm:""
  }]);
  const {menu, comm} = comment;

  // const [selected, setSelected] = useState();
  const [is_login, setLogin] = useState(true);
  // const is_login = useSelector(state => state.user.isLogin);

  const comment_list = useSelector(state => state.comment.list);
  
  const onChange = (e) => {
    setComment({})
  }

  // const selectHandler = (e) => {
  //   setComment(e.target.value)
  //   console.log("셀렉트",e.current.value)
  //   alert(e.target.value)
  // }
  
  // const handleSelect = (e) => {
  //   setComment(e.target.value);
  //   console.log("타겟",e.current.value)
  // };
  // const writeComment = () => {
  //   if(!is_login) {
  //     window.alert("로그인 후 이용 가능합니다!")
  //     return
  //   }
    
  //   if(!comment){
  //     window.alert("댓글을 입력해주세요!")
  //     return;
  //   }
  //   dispatch(commentActions.addCommentDB(props.post_id, comment));
  // }

  return (
    <>
      <WriteWrap>
      <CommentSelect>
            {
                comment_list.menus?.map((e, i) => (
                    <option
                      key={i}

                      value={menu}
                      defaultValue={props.defaultValue === menu}
                      onChange={onChange}
                    >
                      {e.menuTitle}
                    </option> 
                ))
            }
        </CommentSelect>
        <CommentInput 
           placeholder="댓글을 입력해주세요!" 
           value={comm}
           onChange={onChange}  
     
        />
        <Button 
          width="80px"
          _onClick={() => {
            // writeComment();
            console.log(comment.comm)
            // setComment("");
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