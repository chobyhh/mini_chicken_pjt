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
        <Text margin="0px 0px 8px 0px" size='25px'>닉네임</Text>
        <UserInput 
          _onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="닉네임을 입력해주세요!" 
          margin="0px 0px 24px 0px" 
          value={nickname}
        />
        <Text margin="0px 0px 8px 0px" size='25px'>패스워드</Text>
        <UserInput 
          _onChange={(e) => {
            setPwd(e.target.value);
          }}
          placeholder="패스워드를 입력해주세요!" 
          margin="0px 0px 24px 0px" 
          value={password}
          type="password"
        />
        <Text margin="0px 0px 8px 0px" size='25px'>패스워드 확인</Text>
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
          <Text size="20px">회원가입</Text>
        </Button>
        <Button 
          width="48%"
          _onClick={()=>{
            history.push('/');
          }}
        >
          <Text size="20px">취소</Text>
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