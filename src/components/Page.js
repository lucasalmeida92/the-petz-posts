import styled from 'styled-components'
import HeadTag from './HeadTag'

const Header = styled.header`
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

const Main = styled.main`
  margin-top: 100px;
  padding: 8px 16px;
  min-height: calc(100vh - 201px);
  border-radius: 24px 24px 0 0;
  background-color: #fff;
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export default function Page({ pageTitle, children }) {
  return (
    <>
      <HeadTag pageTitle={pageTitle} />
      <Header>
        <WebsiteTitle><a href="/" title="The Petz Posts">The<br/>Petz<br/>Posts</a></WebsiteTitle>
        <Logo src="/logo.png" alt="Petz logo"/>
      </Header>
      <Main>
        {children}
      </Main>
      <Footer>
        <p>Footer</p>
      </Footer>
    </>
  )
}
