import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: ${props => (props.theme.colors.secondary)};
    color: ${props => (props.theme.colors.text2)};
    font-weight: 400;
    font-size: 14px;
  }

  a {
    color: ${props => (props.theme.colors.primary)};
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-weight: 800;
    font-size: 1.8rem;
    line-height: 1.5rem;
    color: ${props => (props.theme.colors.text1)};
  }

  h2 {
    font-weight: 600;
    font-size: 1.2rem;
    line-height: 1.5rem;
    color: ${props => (props.theme.colors.text1)};
  }
`

export default GlobalStyle
