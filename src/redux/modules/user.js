import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";
import { setToken } from "../../shared/token";
import { deleteCookie, setCookie } from "../../shared/Cookie";

// action
const LOGIN = "LOGIN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creator
const login = createAction(LOGIN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, () => ({}));

// initialState
const initialState = {
  user: [],
  is_login: false,
};

//------------------middleware------------------------------

//----------로그인 확인--------------
const loginCheckDB = () => {
  const token = localStorage.getItem("token");
  return function (dispatch, getState, { history }) {
    api
      .post(
        "/users/me",
        {},
        {
          headers: {
            contentType: "applicaton/json;charset=UTF-8",
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(
          login({
            nickname: res.data.nickname,
          })
        );
      })
      .catch((err) => {
        console.log("로그인 확인 실패", err);
      });
  };
};


//-------------로그인-------------------
const loginDB = (nickname, password) => {
  return function (dispatch, getState, { history }) {
    api
      .post("/users/auth", {
        nickname: nickname,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const token_res = res.data.token;
        console.log(token_res);
        setToken(token_res);
       
        return token_res;
        
      })

      .then((token_res) => {
        //토큰저장완료
        api
          .get(
            "/users/me",
            {
              headers: {
                "Authorization": `Bearer ${token_res}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            localStorage.setItem("nickname", res.data.user.nickname);
            dispatch(
              login({
                nickname: res.data.user.nickname,
                 //위치불확실 콘솔찍어서 확인
              })
            );
            history.replace("/");
          })
        .catch((error) => {
        alert(error.response.data.errorMessage);
        // console.log(error)
      });
      })
      .catch((error) => {
        alert(error.response.data.errorMessage);
      })  
  };
};



//------------회원가입-------------------
const signUpDB = (nickname, password, confirmPassword) => {
  return function (dispatch, getState, { history }) {
    api
      .post("/users", {
        nickname: nickname,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        window.alert("회원가입이 완료되었습니다!");
        history.replace("/login");
      })
      .catch((err) => {
        window.alert(err.response.data.errorMessage);
      });
  };
};

//-----------------------reducer------------------------
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;

        console.log("action.payload.user", action.payload.user);
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem("nickname");
        localStorage.removeItem("token");
        // deleteCookie("is_login");
        draft.user = null;

        draft.is_login = false;
        // window.location.replace("/");
        // console.log("로그아웃합니다")
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);





//action creator export
const actionCreators = {
  login,
  loginDB,
  getUser,
  signUpDB,
  logOut,
  loginCheckDB,
};

export { actionCreators };