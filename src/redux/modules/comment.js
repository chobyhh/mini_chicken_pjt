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
  list: [
    // {
    //   restaurantTitle: "bbq",
    //   chickenMenu: "후라이드",
    //   nickname: "asdf",
    //   comment: "test1",
    //   __v: 0
    //   },
    //   {
    //   restaurantTitle: "bbq",
    //   chickenMenu: "양념",
    //   nickname: "bbb",
    //   comment: "test2",
    //   __v: 0
    //   }

  ],
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
  },
  initialState
);
  

const actionCreators = {
  getComment,
  getCommentDB
};

export { actionCreators };