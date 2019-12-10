import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red'

import Dashboard from './Dashboard';
import Order from './Order';

export default function App() {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: red,
    }
  })
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={ theme }>
        <Container>
          <Dashboard />
          <Order />
        </Container>
      </ThemeProvider>
    </>
  )
}