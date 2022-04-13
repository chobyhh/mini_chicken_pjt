import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import { Text, Button } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentItem = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const list_id = params.id

  const user = useSelector(state => state.user.user);
  // console.log("유저",user.nickname)
  // const [user, setUser] = useState(["test1"])

  const brand_list = useSelector(state => state.post.list.restaurants);
  // console.log("제발",brand_list[0].)
  
  const comment_list = useSelector(state => state.comment.list);
  const comment_list2 = comment_list.commentDb;
  // console.log("댓글리스트",comment_list2[props.idx].commentIdx)
  // console.log("props", props.commentIdx)
  
  const [is_first, setIsFirst] = useState(true);
  const [is_edit, setIsEdit] = useState(false);
  
  const [editValue, setEditValue] = useState({menu:'', comm:''});
  const {menu, comm} = editValue;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setEditValue({
    ...editValue, // 기존의 input 객체를 복사한 뒤
    [name]: value // name 키를 가진 값을 value 로 설정
    });

  }

  const edComment = (ed) => {
    if(!editValue) {
      window.alert("댓글을 입력해주세요!");
      return;
    }
    dispatch(commentActions.editCommentDB(
      brand_list ? brand_list[list_id].restaurantTitle : "",
      ed,
      editValue.comm,
      editValue.menu,
      ));
    setEditValue("");
    setIsEdit(false);
  }

  const delComment = (del) => {
    // if(user.nickname !== props.nickname) {
    //   window.alert("본인이 작성한 댓글이 아닙니다.")
    //   return;
    // }

    dispatch(commentActions.deleteCommentDB(
      brand_list ? brand_list[list_id].restaurantTitle : "",
      del
      ));
  }

  const editChange = () => {
    if(user.nickname !== props.nickname) {
      window.alert("본인이 작성한 댓글이 아닙니다.")
      return;
    }
    setIsFirst(false);
    setIsEdit(true);
  }

  if(is_edit) {
    return(
      <CommnetWrap>
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
          _onClick={((ed)=>edComment(
            props.commentIdx
          ))}
        >
          수정
        </Button>
      </CommnetWrap>
    );
  }

  return (
      <CommnetWrap>
        <ContentWrap>
          <Text is_width="150px">{props.nickname}</Text>
          <Text is_width="220px">{props.chickenMenu}</Text>
          <Text is_width="520px">{props.comment}</Text>
        </ContentWrap>
        {
        (user.nickname === props.nickname) ?
          <ButtonWrap>
            <Button 
              width="40px"
              _onClick={editChange}
            >
              수정
            </Button>
            <Button 
              width="40px"
              _onClick={((del)=>delComment(
                props.commentIdx
              ))}
            >
              삭제
            </Button>
          </ButtonWrap>:
          null
        }
      </CommnetWrap>
  );
};

const CommnetWrap = styled.div`
  margin: 0 auto;
  margin-bottom: 8px;
  width: 100%;
  max-width: 980px;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding : 0px 5px 5px 10px
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrap =styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// const EditInput = styled.input`
//   padding: 0px 10px;
//   width: 100%;
//   height: 42px;
//   border: 1px solid #c9c9c9;
//   border-radius: 20px;
//   box-sizing: border-box;
// `;
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

export default CommentItem;