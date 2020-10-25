import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import 'tawian-frontend'
import 'typeface-cousine'
import { setPublicParrotPath } from 'react-partyparrot'

import Game from './routes/Game'
import Home from './routes/Home'

setPublicParrotPath('/other')

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game/:gameId">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
