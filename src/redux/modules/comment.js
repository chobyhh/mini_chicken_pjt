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
  return function(dispatch, getState, {history}) {
    // const user = getState().user.user;
    // console.log("dbwj",user)
    
    const formData = new FormData();
    formData.append('chickenMenu', comment.menu)
    formData.append('comment', comment.comm)
    

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    console.log("formdata",formData)
    console.log("config",config)
    console.log(post_id)
    api
    .post(`/restaurants/${post_id}/comments`, 
    

      formData

      // data:{
      //   chickenMenu: comment.menu,
      // // nickname : user.nickname,    
      //   comment: comment.comm
      // },
    , 
      config
    )
    // .then((res)=>{
    //   alert(res)
    //   dispatch(addComment({
    //     chickenMenu,
    //     comment,
        .then(
        
          dispatch(addComment({
            chickenMenu,
            comment,
        // nickname : res.data.nickname
        } 
      ))
        
      
    

    )
    .catch((err) => {
      alert(2)
      console.log("댓글추가실패", err);
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
        console.log("해봅시다",state, action)
        console.log("결과",action.payload.comment)
        console.log("결과값",draft.list)
        console.log("nick",draft.nickname)
        
        // draft.list[action.payload].unshift(action.payload);
        draft.list.commentDb.unshift(action.payload.comment);
        console.log("결과값222",draft.list.commentDb)
      }),
  },
  initialState
);
  

const actionCreators = {
  getComment,
  addComment,
  getCommentDB,
  addCommentDB
};

export { actionCreators };