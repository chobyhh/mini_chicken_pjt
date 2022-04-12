import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import UserInput from '../components/UserInput';
import { Text, Button, } from '../elements';
import { actionCreators as userActions } from '../redux/modules/user';
// import { idCheck } from '../shared/common';

const Login = (props) => {
  const {history} = props
  const dispatch = useDispatch();

  const [nickname, setId] = useState("");
  const [password, setPwd] = useState("");

  const login = () => {
    if(nickname === "" || password === "") {
      window.alert("모두 입력해주세요!");
      return;
    }

    // if(!idCheck(id)) {
    //   window.alert("이메일 형식이 맞지 않습니다!");
    //   return;
    // }

    dispatch(userActions.loginDB(nickname, password));
  }

  return (
    <LoginWrap>
      <Text margin="0px 0px 48px 0px" size="48px" bold>로그인</Text>
      <ContentWrap>
        <Text margin="0px 0px 8px 0px">이메일</Text>
        <UserInput 
          _onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="이메일을 입력해주세요!" 
          margin="0px 0px 36px 0px"
          value={nickname} 
        />
        <Text margin="0px 0px 8px 0px">패스워드</Text>
        <UserInput 
          _onChange={(e) => {
            setPwd(e.target.value);
          }}
          placeholder="패스워드를 입력해주세요!" 
          margin="0px 0px 36px 0px" 
          value={password}
          type="password"
        />
      </ContentWrap>
      <ButtonWrap>
        <Button width="48%" _onClick={login}>로그인</Button>
        <Button 
          width="48%"
          _onClick={()=>{
            history.push('/signup')
          }}
        >
          회원가입
        </Button>
      </ButtonWrap>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
  width: calc(90% - 400px);
  padding: 80px 40px;
  margin: 0 auto;
  text-align: center;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Login;

























// import React from "react";
// import styled from "styled-components";
// import { Text, Input, Grid, Button } from "../elements";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from '../redux/modules/user';

// // // redux
// // import { useDispatch } from 'react-redux';
// // import { useSelector } from 'react-redux';

// function Login(props) {
//     const history = useHistory();
//     const dispatch = useDispatch();

//     const [nickname, setId] = React.useState("");
//     const [password, setPassword] = React.useState("");

//     const handleIdInput = (e) => {
//         setId(e.target.value)
//     }

//     const handlePasswordInput = (e) => {
//         setPassword(e.target.value)
//     }


//     const handleLogin = () => {
//         if (nickname === "" || password === "") {
//             window.alert("아이디 혹은 비밀번호가 공란입니다.")
//             return;
//         }
//         dispatch(userActions.loginDB(nickname, password));
        
//     }


//     return (
//         <>
//         <div className="loginImage">
//         <div className="login">
//         <div className="loginContainer">
//         <div className="login_Title"><h2>Login!</h2></div>
//                 <input
//                     type="text"
//                     className="loginIdInput"
//                     onChange={handleIdInput}
//                     placeholder="ID"
//                 />
       
//                 <input
//                     type="password"
//                     className="loginPasswordInput"
//                     onChange={handlePasswordInput}
//                     placeholder="Password"
//                 />
           
//             <div className="loginBtn">
//                 <Button
//                  variant="contained"
//                  color="primary"
//                  box-shadow="0px 7px 3px rgba(0, 0, 0, 0.2)"
//                  type="submit"
//                  onClick={handleLogin}
//                 >
//                 로그인
//                 </Button>
//             </div>
//         </div>
//         </div>
//         </div>
//     </>
//     );
// }



//     const Login = (props) => {
//         return (
//         <React.Fragment>
//             <Grid padding="16px">
//             <Text size="32px" bold>
//                 로그인
//             </Text>
    
//             <Grid padding="16px 0px">
//                 <Input
//                 label="아이디"
//                 placeholder="아이디를 입력해주세요."
//                 _onChange={() => {
//                 }}
//                 />                                                                                                                                                             
//             </Grid>
    
//             <Grid padding="16px 0px">
//                 <Input
//                 label="패스워드"
//                 placeholder="패스워드 입력해주세요."
//                 _onChange={() => {
//                     console.log("패스워드 입력완료");
//                 }}
//                 />
//             </Grid>
    
//             <Button
//                 text="로그인하기"
//                 _onClick={() => {
//                 console.log("로그인 했어!");
//                 }}
//             ></Button>
//             </Grid>
//         </React.Fragment>
//         );
//     };
    
// // }


// export default Login;