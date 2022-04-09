import './App.css';
import styled from 'styled-components';
import {BrowserRouter, Route} from "react-router-dom";
import Main from './pages/Main';
import Header from './components/Header';
import Detail from './pages/Detail';

function App() {
  return (
    <>
      <AppWrap>
        <Header/>
      </AppWrap>
      <ContentWrap>
        <BrowserRouter>
          <Route path="/" exact component={Main}/>
          <Route path="/detail" exact component={Detail}/>
        </BrowserRouter>
      </ContentWrap>
      
    </> 
  );
}

const AppWrap = styled.div`
  margin: 0 auto;
  margin-bottom: 12px;
  padding: 0px 40px;
  max-width: 1100px;
  box-sizing: border-box;
`

const ContentWrap = styled.div`
  margin: 0 auto;
  padding: 0px 40px;
  max-width: 1100px;
  box-sizing: border-box;
`

export default App;
