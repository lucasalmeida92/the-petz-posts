import styled from 'styled-components'
import HeadTag from './HeadTag'

const Header = styled.header`
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100px;
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
  align-items: center;
`;

const WebsiteTitle = styled.h1`
  a {
    color: ${props => (props.theme.colors.text1)};
  }
`;

const Logo = styled.img`
  height: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
  max-height: calc(100vh - 200px);
  margin-top: 100px;
  border-radius: 24px 24px 0 0;
  background-color: #fff;
  overflow-y: auto;
`;

const Main = styled.main`
  padding: 8px 16px;
  flex: 1;
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  font-size: .8rem;
`;

export default function Page({ pageTitle, children }) {
  return (
    <>
      <HeadTag pageTitle={pageTitle} />
      <Header>
        <WebsiteTitle><a href="/" title="The Petz Posts">The<br/>Petz<br/>Posts</a></WebsiteTitle>
        <Logo src="/logo.png" alt="Petz logo"/>
      </Header>
      <Container>
        <Main>
          {children}
        </Main>
        <Footer>
          <p>The Petz Posts<br />Made with s2 by Lucas Almeida Siqueira</p>
        </Footer>
      </Container>
    </>
  )
}
