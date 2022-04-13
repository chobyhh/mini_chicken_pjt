import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import axios from "axios";
import api from "../../api/api";

const GET_COMMENT = "GET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const getComment = createAction(GET_COMMENT, (comment_list) => ({ comment_list }));
const addComment = createAction(ADD_COMMENT, (comment) => ({ comment }));
const editComment = createAction(EDIT_COMMENT, (comment_id, comment) => ({comment_id, comment}));

const deleteComment = createAction(DELETE_COMMENT, (comment_idx) => ({ comment_idx }));

const initialState = {
  list: [],
};

const getCommentDB = (post_id) => {
    console.log("포스트",post_id)

    // const token = localStorage.getItem('token');
    return async function (dispatch, getState, { history }) {
      await api.get(`/restaurants/${post_id}`).then(function(response){
        
        // console.log("getComment",response)
        // console.log("아이디",post_id)

        dispatch(getComment(response.data))
      // console.log(error);
    })
  };
}



const addCommentDB = (post_id, comment, chickenMenu, nickname) => {
  const token = localStorage.getItem('token');
  console.log("토큰",token)
  return async function(dispatch, getState, {history}) {
    const user = getState().user.user;
    const body = {
      chickenMenu : chickenMenu,
      comment : comment,
      nickname : nickname
    }
    console.log("치킨",body)
    
    await api
    .post(`/restaurants/${post_id}/comments`, 
      body,{
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }      
    )
   .then(       
        dispatch(addComment({
          chickenMenu,
          comment,
          nickname,
      // nickname : res.data.nickname
        } 
      ))
    )
    .catch((err) => {
      alert("메뉴를 선택해주세요")
      console.log("댓글추가실패", err);
    })
  }
}

const editCommentDB = (post_id, comment_id, comment) => {
  console.log("수정",comment)
  console.log("수정아이디",comment_id)
  return async function (dispatch, getState, {history}) {
    const user = getState().user.user;

    const token = localStorage.getItem('token');
    const body = {
      
      comment,
     
    }
    await api
    .put(`/restaurants/${post_id}/comments/${comment_id}`, 
      // nickname : user.nickname,    
      body,
      // chickenMenu : chickenMenu,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(editComment(comment_id, comment));
    })
    .catch((err) => {
      alert("2")
      console.log("댓글수정실패", err);
    })
  }
}

const deleteCommentDB = (post_id, comment_id) => {
  
  const token = localStorage.getItem('token');
  console.log("코멘트아이디",comment_id)
  return async function (dispatch, getState, {history}){
    // const _comment = getState().comment.list.commentDb;
    // console.log("_comment",_comment)
    await api.delete(`/restaurants/${post_id}/comments/${comment_id}`,{
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
    .then((response) => {
      const _comment = getState().comment.list.commentDb;

      const comment_idx = _comment.findIndex((c) => {
        return parseInt(c.commentIdx) === parseInt(comment_id);
      })
      dispatch(deleteComment(comment_idx)) 
    }
      
    )
    // .then((response) => {
    //   const _comment = getState().comment.list.commentDb;

    //   const comment_idx = _comment.findIndex((c) => {
    //     return parseInt(c.commentIdx) === parseInt(comment_id);
    //   })
    //   dispatch(deleteComment(comment_idx))

    // })
    .catch((err) => {
      console.log("삭제실패");
    })
  }
}


export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // draft.list = [];
        console.log("get_comment 리듀서 실행");
        // console.log("액션",action);
        draft.list = action.payload.comment_list;
        // console.log("드래프트",draft.list);

      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        console.log("add_comment 실행")       
        draft.list.commentDb.push(action.payload.comment);
        console.log("add_comment 드래프트",draft.list.commentDb)
        // draft.list.commentDb.unshift(action.payload.comment, action.payload.nickname);
        // console.log("결과값222",draft.list.commentDb)
      }),
      [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.commentDb.findIndex((c) => {
          return  parseInt(c.commentIdx) === parseInt(action.payload.comment_id)
        })
    
        draft.list.commentDb[idx] = {...draft.list.commentDb[idx], comment: action.payload.comment};
      }),
      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        console.log("state",draft)
        console.log("action",action)
        const new_comment_list = draft.list.commentDb.filter((c, i) => {
          return parseInt(action.payload.comment_idx) !== i;
        })

        draft.list.commentDb = new_comment_list;
      }),

  },
  initialState
);
  

const actionCreators = {
  getComment,
  addComment,
  editComment,
  deleteComment,
  getCommentDB,
  addCommentDB,
  deleteCommentDB,
  editCommentDB
};

export { actionCreators };