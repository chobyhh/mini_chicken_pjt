import React from 'react'
import styled from 'styled-components';
import { Text, Button } from '../elements'
import {history} from "../redux/configStore";

const Header = (props) => {
  
 
    return (
        <HeaderContainer>
          <div>
            <Text 
              is_cursor
              _onClick={()=>{history.replace('/')}}
              size="20px" 
              bold
            >
              {/* 치킨 어때? 로 바꾸기 */}
              웹 페이지 제목   
            </Text>
          </div>

         <ButtonContainer>
          <Button 
            margin="0px 10px 0px 0px"
            text-size="16px" 
            width="100px"
            _onClick={()=>{history.replace('/login')}}
          >
            로그인
          </Button>
          <Button 
            text-size="16px"
            width="100px"
            _onClick={()=>{history.replace("/signup")}}
          >
            회원가입
          </Button>
        </ButtonContainer>

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