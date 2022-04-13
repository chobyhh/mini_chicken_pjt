import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Text, Button } from '../elements'
import {history} from "../redux/configStore";
import { getCookie } from '../shared/Cookie';
import { actionCreators as userActions } from '../redux/modules/user';

const Header = (props) => {
    const dispatch = useDispatch();
    // const [is_login, setLogin] = useState(true);
    const is_login = useSelector(state => state.user.is_login);
    console.log("가져오냐",is_login)
    const user = useSelector(state => state.user.user)
 
    return (
        <HeaderContainer>
          <div>
            <Text 
              is_cursor
              _onClick={()=>{history.replace('/')}}
              size="22px" 
              bold
            >
              {/* 치킨 어때? 로 바꾸기 */}
              치킨 어때?   
            </Text>
          </div>

          {!is_login ? 
            <ButtonContainer>
              <Button 
                margin="0px 10px 0px 0px"
                text-size="16px" 
                width="100px"
                _onClick={() => {
                  history.replace('/login')
                }}
              >
                로그인
              </Button>
              <Button 
                text-size="16px"
                width="100px"
                _onClick={() => {
                  history.replace('/signup')
                }} 
              >
                회원가입
              </Button>
            </ButtonContainer> :

            <ButtonContainer>
              <Button 
                margin="0px 10px 0px 0px"
                text-size="16px" 
                width="120px"
                _onClick={() => {
                  history.replace(`/user/${user.nickname}`)
                }}
              >
                마이 페이지
              </Button>
              <Button 
                text-size="16px" 
                width="120px"
                _onClick={() => {
                  dispatch(userActions.logOut());
                  history.replace('/')
                }}
              >
                로그아웃
              </Button>
            </ButtonContainer>
          }
          </HeaderContainer>
        
    );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom: 1px solid black;
`;

const ButtonContainer = styled.div`
  display: flex;
  min-width: 133px;
`;


export default Header;