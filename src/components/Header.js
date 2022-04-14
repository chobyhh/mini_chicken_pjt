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
    // const is_login = useSelector(state => state.user.is_login);
    // console.log("가져오냐",is_login)
    const user = useSelector(state => state.user.user)
    const localStoragetokenCheck = localStorage.getItem('token');
 
    return (
        <HeaderContainer>
          <div>
          <img src='logo_1.png' 
              back_size="100% 100%"
              height="100px"
              onClick={()=>{history.replace('/')}}
            alt='logo'/>
          </div>

          {!localStoragetokenCheck ? 
            <ButtonContainer>
              <Button 
                margin="0px 10px 0px 0px"
                text-size="16px" 
                width="100px"
                bg= "#F9F7CF"
                _onClick={() => {
                  history.replace('/login')
                }}
              >
                <Text size="20px">로그인</Text>
              </Button>
              <Button 
                text-size="16px"
                width="100px"
                bg= "#F9F7CF"
                _onClick={() => {
                  history.replace('/signup')
                }} 
              >
                <Text size="20px">회원가입</Text>
              </Button>
            </ButtonContainer> :

            <ButtonContainer>
              
              <Button 
                text-size="16px" 
                width="120px"
                bg= "#F9F7CF"
                _onClick={() => {
                  dispatch(userActions.logOut());
                  history.replace('/')
                }}
              >
                <Text size="20px">로그아웃</Text>
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
  height: 90px;
  border-bottom: 5px solid #EC524B;
  background: #F9F7CF;
`;

const ButtonContainer = styled.div`
  display: flex;
  min-width: 133px;
`;


export default Header;