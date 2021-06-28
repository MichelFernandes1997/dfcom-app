import React from 'react'

import { ThemeProvider, DefaultTheme } from 'styled-components'

import usePersistedState from './utils/usePersistedState'

import light from "./styles/themes/light"

//import dark from "./styles/themes/dark"

import GlobalStyle from './styles/global'

import Routes from './routes'

import { AuthProvider } from './contexts/authContext'

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
