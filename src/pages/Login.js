import React from "react";
import styled from "styled-components";
import { Text, Input, Grid, Button } from "../elements";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";


// // redux
// import { useDispatch } from 'react-redux';
// import { userCreators } from '../modules/user';
// import { useSelector } from 'react-redux';

const history = useHistory();
const dispatch = useDispatch();

const handleIdInput = (e) => {
    setId(e.target.value)
}

const handlePasswordInput = (e) => {
    setPassword(e.target.value)
}


const handleLogin = () => {
    if (nickname === "" || password === "") {
        window.alert("아이디 혹은 비밀번호가 공란입니다.")
        return;
    }
    dispatch(userActions.loginDB(nickname, password));
    
}

const Login = (props) => {
    return (
      <React.Fragment>
        <Grid padding="16px">
          <Text size="32px" bold>
            로그인
          </Text>
  
          <Grid padding="16px 0px">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요."
              _onChange={() => {
                  set
              }}
            />                                                                                                                                                             
          </Grid>
  
          <Grid padding="16px 0px">
            <Input
              label="패스워드"
              placeholder="패스워드 입력해주세요."
              _onChange={() => {
                console.log("패스워드 입력완료");
              }}
            />
          </Grid>
  
          <Button
            text="로그인하기"
            _onClick={() => {
              console.log("로그인 했어!");
            }}
          ></Button>
        </Grid>
      </React.Fragment>
    );
  };
  



export default Login;