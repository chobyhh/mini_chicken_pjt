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
            dispatch(
              login({
                nickname: res.data.user.nickname, //위치불확실 콘솔찍어서 확인
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




// const loginDB = (nickname, password) => {
//   return function (dispatch, getState, {history}) {
//        api 
//        .post('/users/auth', { nickname, password }) 
//        .then((res) => {
//             const token_res = res.headers.authorization; 
//             setToken(token_res); 
//             return token_res }
//             ) 
//             .then((token_res) => { 
//                 api 
//                 .get("/users/me", 
//                      {headers: { "Authorization": `${token_res}` }}) 
//                 .then((res) => {
//                      dispatch(login(
//                           { nickname: res.data.nickname }) 
//                           ); 
//                          }) 
//                      } 
//                      ) 
//                      .catch(error){
//                           alert(error.response.data.errorMessage) 
//                          } 
//                      }; 
//                  };




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

// const loginDB = (nickname, password) => {
//   return function (dispatch, getState, { history }) {
//     api
//     .post('/users/auth',{
//       nickname: nickname,
//       password: password,
//     })
//     .then((res) => {
//       const token_res = res.headers.authorization;
//       setToken(token_res);

//       return token_res
//     })
//     .then((token_res) =>{
//       api({
//         method: "post",
//         url: "/users/me",
//         headers: {
//           "Authorization": `${token_res}`,
//         },
//       })
//       .then((res) => {
//         dispatch(login(
//           {
//             nickname: res.data.nickname
//           })
//         );
//       })
//       }
//     )
//     .catch(error) {
//       alert(error.response.data.errorMessage)
//     };
//   };
// };

// const loginDB = (nickname, password) => {
//   return async function (dispatch, getState, { history }) {
//     const data = {
//       nickname: nickname,
//       password: password,
//     };
//     dispatch(login(data.nickname));
//     await api
//       .post("/users/auth", data)
//       .then((response) => {
//         console.log(response);
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("name", response.data.nickname);
//           dispatch(login(response.data.name));
//           history.push("/");
//         //   window.location.replace("/");

//           console.log("로그인이 되었어요");
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         alert(error.data);
//       });
//   };
// };

//회원가입
// const signUp = (nickname, password, confirmPassword) => {
//   return function (dispatch, getState, { history }) {
//     api
//       .post("/users", {
//         nickname: nickname,
//         password: password,
//         confirmPassword: confirmPassword,
//       })
//       .then((res) => {
//         console.log(res);
//         window.alert("회원가입이 완료되었습니다.");
//         // history.replace("/login");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

//아이디 중복확인 (아직수정필요)
// const checkId = (nickname) => {
//     return function (dispatch, getState, { history }) {
//   axios
//     .get(`api/users/auth/${username}`, {
//       username: username,
//     })
//     .then((res) => {
//       console.log(res, res.data, res.data.result);
//       if (res.data.result) {
//         window.alert("이미 존재하는 아이디 입니다.");
//       } else {
//         window.alert("아이디 중복확인이 완료되었습니다.");
//       }
//       // className에 success 달아줘야함
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const loginDB = (nickname, password) => {
//     const token = getCookie("token");
//     return function (dispatch, getState, { history }) {
//     console.log(username, password);

//     axios
//       .post(
//         "api/users/auth",
//         {
//             nickname: username,
//             password: password,
//         },
//         { withCredentials: true }
//       )
//       .then((res) => {
//         console.log("res", res);

//         const _auth = res.headers.authorization;
//         const _cookie = _auth.split(" ")[1];

//         // setCookie = (name, value, exp)
//         setCookie("token", _cookie, 7);
//         localStorage.setItem("username", username);
//         localStorage.setItem("token", _cookie);

//         dispatch(setLogin());
//         history.push("/");
//         window.location.reload();
//       })
//       .catch((err) => {
//         window.alert("아이디, 비밀번호를 확인해주세요!")

//         console.log(err);
//       });
//   };
//  1번 header를 때려 박는다

// export const logoutM =
//   () =>
//   async (dispatch, getState, { history }) => {
//     axios
//       .post("http://3.38.178.109/user/logout")
//       .then((res) => {
//         // deleteCookie = (name)
//         deleteCookie("token");
//         localStorage.removeItem("username");
//         localStorage.removeItem("token");
//         dispatch(logOut());
//         history.replace('/')
//         window.location.reload();

//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

// // 수정 필요
// const loginCheckM = () => {
//   return function (dispatch, getState, { history }) {
//     const userId = localStorage.getItem("username");
//     const tokenCheck = document.cookie;
//     if (tokenCheck) {
//       dispatch(
//         setLogin({
//           username: userId,
//         })
//       );
//     } else {
//       dispatch(logOut());
//     }
//   };
// };

// const userinfoM = () => async (dispatch, getState) => {
//   instance
//     .get("http://3.38.178.109/userinfo")
//     .then((res) => {
//       console.log("user값을 불러왔어요", res);
//       dispatch(
//         setUserInfo({
//           userId: res.data.userId,
//           username: res.data.username,
//           registerStudyList: res.data.registerStudyList,
//         })
//       );
//     })
//     .catch((err) => {
//       // window.alert("user값을 불러오지 못했습니다");
//       console.log(err);
//     });
// };

// //회원가입
// export const SignUpDB = (nickname, password, confirmPassword) => {
//   return function (dispatch, getState, {history}) {
//     axios
//     .post("/api/users", {nickname, password, confirmPassword})
//     .then((res) => {
//       const message = res.data.message;
//       if(message !== 'success') {
//       window.alert(res.data.message);
//       return;
//     }
//       window.alert("회원가입 완료");
//       history.replace("/login");
//     })
//     .catch((err) => {
//       window.alert('회원가입 실패. 아이디와 비밀번호를 확인해주세요.')
//       console.log(err);
//     });
//   }
// }

// //로그인
// export const LogInDB = (nickname, password) => {
//   return function(dispatch, getState, {history}) {
//     axios
//       .post("/api/users/auth", {nickname, password,})
//       .then((res) => {
//         const message = res.data.message;
//         if (message !== "success") {
//           window.alert(res.data.message);
//           return;
//         }
//         const userInfo = {
//           token: res.data.token,
//           username: res.data.user
//         }
//         dispatch(SetUser(userInfo));
//         window.alert("로그인 성공");
//         history.push("/");
//         window.location.reload();
//       })
//       .catch((err) => {
//         window.alert("회원정보를 확인해주세요.");
//         console.log("회원가입 DB 저장 오류", err);
//       });
//   }
// }

// //로그인 상태 확인
// export const LogInChk = () => {
//   return function (dispatch, getState, {history}) {
//     const token = getCookie("token")
//       if(token === null) {
//       return;
//       }

//     instance
//       .get('/api/users/me')
//       .then((res) => {
//         if(res.data.message !== 'success') {
//           window.alert(res.data.message)
//         }
//         dispatch(setUserName(res.data.user));
//       })
//       .catch((err) =>{
//         window.alert('로그인 정보를 확인해주세요.')
//         console.log(err);
//       })
//   }
// }

// //리덕스
// const user = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     //로그인 > 토큰은 로컬에 저장중
//     SetUser: (state, action) => {
//       state.user_info = action.payload.username;
//       setCookie("token", action.payload.token);
//       state.is_login = true;
//     },
//     //로그아웃
//     LogOut: (state, action) => {
//       deleteCookie("token");
//       state.is_login = false;
//       window.alert("로그아웃이 완료되었습니다.");
//     },
//     // 로그인 시 닉네임이 없어서 닉네임으로 가공해서 웹 내에서 사용
//     setUserName: (state, action) => {
//       state.user_info = action.payload;
//       state.is_login = true;
//     },
//   },
// });
