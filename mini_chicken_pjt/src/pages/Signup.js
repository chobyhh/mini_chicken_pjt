import React, { useDebugValue, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import UserInput from '../components/UserInput';
// import axios from 'axios';

import { Text, Button, } from '../elements';
import { actionCreators as userActions } from '../redux/modules/user';
// import { idCheck, usernameCheck } from '../shared/common';

const Signup = (props) => {
  const {history} = props;
  const dispatch = useDispatch();

  const [nickname, setId] = useState("");
  const [password, setPwd] = useState("");
  const [confirmPassword, setPwdCheck] = useState("");

  const signup = () => {
    

    dispatch(userActions.signUpDB(nickname, password, confirmPassword));
  }

  return (
    <SignupWrap>
      <Text margin="0px 0px 48px 0px" size="48px" bold>회원가입</Text>
      <ContentWrap>
        <Text margin="0px 0px 8px 0px">닉네임</Text>
        <UserInput 
          _onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="닉네임을 입력해주세요!" 
          margin="0px 0px 24px 0px" 
          value={nickname}
        />
        <Text margin="0px 0px 8px 0px">패스워드</Text>
        <UserInput 
          _onChange={(e) => {
            setPwd(e.target.value);
          }}
          placeholder="패스워드를 입력해주세요!" 
          margin="0px 0px 24px 0px" 
          value={password}
          type="password"
        />
        <Text margin="0px 0px 8px 0px">패스워드 확인</Text>
        <UserInput 
          _onChange={(e) => {
            setPwdCheck(e.target.value);
          }}
          placeholder="패스워드를 똑같이 입력해주세요!" 
          margin="0px 0px 24px 0px" 
          value={confirmPassword}
          type="password"
        />
      </ContentWrap>
      <ButtonWrap>
        <Button 
          width="48%"
          _onClick={signup}
        >
          회원가입
        </Button>
        <Button 
          width="48%"
          _onClick={()=>{
            history.push('/');
          }}
        >
          취소
        </Button>
      </ButtonWrap>
    </SignupWrap>
  );
};

const SignupWrap = styled.div`
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

export default Signup;


















// import React from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { Grid, Text, Input, Button } from "../elements";

// import { actionCreators as userActions } from '../redux/modules/user';




// const Signup = (props) => {
//   return (
//     <React.Fragment>
//       <Grid padding="16px">
//         <Text size="32px" bold>
//           회원가입
//         </Text>

//         <Grid padding="16px 0px">
//           <Input
//             label="아이디"
//             placeholder="아이디를 입력해주세요."
//             _onChange={() => {
//               console.log("아이디입력완료");
//             }}
//           />
//         </Grid>


//         <Grid padding="16px 0px">
//           <Input
//             label="비밀번호"
//             placeholder="비밀번호를 입력해주세요."
//             _onChange={() => {
//               console.log("비밀번호입력완료");
//             }}
//           />
//         </Grid>

//         <Grid padding="16px 0px">
//           <Input
//             label="비밀번호 확인"
//             placeholder="비밀번호를 다시 입력해주세요."
//             _onChange={() => {
//               console.log("비밀번호확인완료");
//             }}
//           />
//         </Grid>

//         <Button 
//             type="submit"
//             onClick={() => {
//                 console.log("회원가입완료");
//               }}
//             text="회원가입하기">
//         </Button>
//       </Grid>
//     </React.Fragment>
//   );
// };





// Signup.defaultProps = {};

// export default Signup;
