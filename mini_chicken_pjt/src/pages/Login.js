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

    dispatch(userActions.loginDB(nickname, password));
  }

  return (
    <LoginWrap>
      <Text margin="0px 0px 48px 0px" size="48px" bold>로그인</Text>
      <ContentWrap>
        <Text margin="0px 0px 8px 0px">닉네임</Text>
        <UserInput 
          _onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="닉네임을 입력해주세요!" 
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


