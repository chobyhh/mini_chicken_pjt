import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import axios from "axios";

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

const getCommentDB = (name) => {
  return function (dispatch, getState, {history}) {
    axios
    .get(`http://pooreum.shop/restaurants/${name}`)
    .then((res) => {
      dispatch(getComment(res.data));
      // /* dispatch(getComment(res.data)); */
    })
    .catch((err) => {
      console.log("댓글 조회 실패", err);
    })
  }
}

export default handleActions({
  [GET_COMMENT]: (state, action) => produce(state, (draft) => {
    draft.list = [];
    draft.list.push(...action.payload.comment_list);

    draft.list = draft.list.reduce((acc, cur) => {
      if(acc.findIndex(a => a.commentId === cur.commentId) === -1) {
        return [...acc, cur];
      } else {
        acc[acc.findIndex(a => a.commentId === cur.commentId)] = cur;
        return acc;
      }
    }, [])
  }),
  

}, initialState);

const actionCreators = {
  getComment,
  getCommentDB
};

export { actionCreators };