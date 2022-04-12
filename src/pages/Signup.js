import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Grid, Text, Input, Button } from "../elements";

import { actionCreators as userActions } from '../redux/modules/user';




const Signup = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={() => {
              console.log("아이디입력완료");
            }}
          />
        </Grid>


        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            _onChange={() => {
              console.log("비밀번호입력완료");
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={() => {
              console.log("비밀번호확인완료");
            }}
          />
        </Grid>

        <Button 
            type="submit"
            onClick={() => {
                console.log("회원가입완료");
              }}
            text="회원가입하기">
        </Button>
      </Grid>
    </React.Fragment>
  );
};





Signup.defaultProps = {};

export default Signup;
