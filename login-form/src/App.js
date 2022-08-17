import "./App.css";
import { Container, LoginContainer, LoginText, LoginInput, LoginBtn, LoginBtnDiv } from "./css/login";

function App() {
  return (
    <div className="App">
      <header style={{ height: 100 }}>안녕</header>
      <Container>
        <div>왼쪽</div>
        <LoginContainer>
          <h2>Login</h2>
          <LoginText>
            ID <LoginInput />
          </LoginText>
          <LoginText>
            PassWord <LoginInput />
          </LoginText>
          <LoginBtnDiv>
            <LoginBtn>로그인</LoginBtn>
          </LoginBtnDiv>
        </LoginContainer>
        <div>오른쪽</div>
      </Container>
    </div>
  );
}

export default App;
