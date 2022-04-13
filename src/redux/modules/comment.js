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



const addCommentDB = (post_id, comment, chickenMenu) => {
  const token = localStorage.getItem('token');
  console.log("토큰",token)
  return async function(dispatch, getState, {history}) {
    const user = getState().user.user;
    const body = {
      chickenMenu : chickenMenu,
      comment : comment
    }
    console.log("치킨",body)
    
    await api
    .post(`/restaurants/${post_id}/comments`, 
      body,      
    )
   .then(       
        dispatch(addComment({
          chickenMenu,
          comment,
          nickname: user.nickname,
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

const editCommentDB = (post_id, comment, chickenMenu) => {
  return async function (dispatch, getState, {history}) {
    const user = getState().user.user;

    const token = localStorage.getItem('token');
    
    await api
    .post(`/restaurants/${post_id}/comments`, {
      // nickname : user.nickname,    
      comment: comment,
      // chickenMenu : chickenMenu,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      dispatch(editComment(post_id, comment));
    })
  }
}

const deleteCommentDB = (post_id, comment_id) => {
  const token = localStorage.getItem('token');
  return async function (dispatch, getState, {history}){
    await api.delete(`/restaurants/${post_id}/comments/:commntid`,{
    })
    .then((res) => {
      const _comment = getState().comment.list.commentDb;

      const comment_idx = _comment.findIndex((c) => {
        return parseInt(c.commentIdx) === parseInt(comment_id);
      })
      dispatch(deleteComment(comment_idx))

    })
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
        // console.log(state);
        // console.log("액션",action);
        draft.list = action.payload.comment_list;
        // console.log("드래프트",draft.list);

      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list.commentDb.unshift(action.payload.comment);
        console.log("결과값222",draft.list.commentDb)
      }),
      [EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((c) => {
          return  parseInt(c.commentIdx) === parseInt(action.payload.comment_id)
        })
    
        draft.list[idx] = {...draft.list[idx], comment: action.payload.comment};
      }),
      [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
        const new_comment_list = draft.list.filter((c, i) => {
          return parseInt(action.payload.comment_idx) !== i;
        })

        draft.list = new_comment_list;
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