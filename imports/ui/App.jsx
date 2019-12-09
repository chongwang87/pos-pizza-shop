import React from 'react';

import Hello from './Hello.jsx';
import Order from './Order.jsx';

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

const App = () => (
  <>
    <CssBaseline />
    <Container>
      <h1>Welcome to Popular Pizza!</h1>
      <Hello />
      <Order />
    </Container>
  </>
);

export default App;
