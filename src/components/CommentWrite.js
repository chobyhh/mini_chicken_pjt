import React, { useState, Component, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Input, Button, WriteInput, Text } from '../elements';
import { actionCreators as commentActions } from '../redux/modules/comment';

import { useParams } from 'react-router-dom';


const CommentWrite = (props) => {
  const dispatch = useDispatch();

  const params = useParams();
  const list_id = params.id

  const [comments, setComments] = useState({menu:'', comm:''});
  // const [selects, setSelects] = useState("");
  const {menu, comm} = comments;

  // const [selected, setSelected] = useState();
  // const [is_login, setLogin] = useState(true);
  // const is_login = useSelector(state => state.user.isLogin);
  const localStoragetokenCheck = localStorage.getItem('token');

  const comment_list = useSelector(state => state.comment.list);
  const brand_list = useSelector(state => state.post.list.restaurants);
  const user = useSelector(state => state.user.user)
  console.log("user",user.nickname)


  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setComments({
    ...comments, // 기존의 input 객체를 복사한 뒤
    [name]: value // name 키를 가진 값을 value 로 설정
    });
  

  }

  const writeComment = () => {
    if(!localStoragetokenCheck) {
      window.alert("로그인 후 이용 가능합니다!")
      return
    }
    
    if(!comments){
      window.alert("댓글을 입력해주세요!")
      return;
    }
    dispatch(commentActions.addCommentDB(
      brand_list ? brand_list[list_id].restaurantTitle : "", comments.comm, comments.menu, user.nickname));
    setComments('');
    console.log("확인",comments)
  }
  
  return (
    <>
      <WriteWrap>
      <CommentSelect onChange={onChange} name="menu" value={menu || ''} defaultValue={props.defaultValue === menu} >
            {
                comment_list.menus?.map((e, i) => (
                    <option
                    key={i}
                    >
                      {e.menuTitle}
                    </option> 
                ))
            }
        </CommentSelect>
        <CommentInput 
          name="comm"
          placeholder="댓글을 입력해주세요!" 
          value={comm || ''}
          onChange={onChange}  
     
        />
        <Button 
          width="80px"
          bg= "#F9F7CF"
          _onClick={
            // writeComment();
      
            writeComment
            // console.log("선택값",selects)
            // setComment("");
          }
        >
          <Text size="20px">작성</Text>
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
  margin-right:5px;
  width: 45%;
  height: 45px;
  // border-bottom: 1px solid #c9c9c9;
  // border-radius: 20px;
  border : none;
  border-bottom : 3px solid #EC524B;
  

  box-sizing: border-box;
  // &:focus {
  //   border-bottom: 1px solid #c9c9c9;
  //   border-radius: 20px;
  // }
`;

const CommentInput = styled.input`
  padding: 0px 10px ;
  width: 100%;
  height: 42px;
  margin-left:"2px";
  // border: 1px solid #c9c9c9;
  // border-radius: 20px;
  // box-sizing: border-box;
  border : none;
  border-bottom : 3px solid #EC524B;
  // &:focus {
  //   border-bottom: 1px solid #c9c9c9;
  //   border-radius: 20px;
  // }
`;

export default CommentWrite;