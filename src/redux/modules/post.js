import { createAction, handleActions } from 'redux-actions'
import { produce } from "immer";
import axios from "axios";

// actions
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const GET_USERPOST = "GET_USERPOST"
const ADD_USERPOST = "ADD_USERPOST"
const DELETE_USERPOST = "DELETE_USERPOST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post_data) => ({ post_data }));
const editdPost = createAction(EDIT_POST, (post_id, post) => ({ post_id, post }));
const deletePost = createAction(DELETE_POST, (post_index) => ({ post_index }));

const getUserPost = createAction(GET_USERPOST, (mypost_list) => ({ mypost_list }));
const addUserPost = createAction(ADD_USERPOST, (mypost_data) => ({ mypost_data }));
const deleteUserPost = createAction(DELETE_USERPOST, (mypost_idX) => ({ mypost_idX }));

//초기값 설정
//초기값은 딕셔너리 형태로
// initialState
const initialState = {
    list: [],
    mylist: [],
  };

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "yoon",
    //     user_Profile: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201911/22/ee69e453-ba32-4e0b-985d-2e2573fb6297.jpg",
    // },
    restaruranstTitle: "test",
    // contents: "후라이드",
    // comment: "test comment",

};

//미들웨어
const getPostFB = () => {
    return function(dispatch, getState, {history}) {
    axios.get('../../db.json')
    .then((res) => {
        dispatch(getPost(res.data));
    })
    .catch((err)=> {
        console.log(err);
    })
    }
}

// reducer
export default handleActions(
    {
        [GET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
  
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) =>
            produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

            draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
        }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            draft.list = draft.list.filter((p) => p.id !== action.payload.post_id);
            // window.location.reload();
        }),
    },
    initialState
);
