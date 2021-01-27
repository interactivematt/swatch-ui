import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MainLibrary from '../Main/MainLibrary'
import MainEditor from '../Main/MainEditor'


export default class HomePage extends React.Component {
  
  render(){
    return(
      <>
        <main className='App'>
          <Main></Main>
        </main>
      </>
    )
  }
}

function Main() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route
        exact path={path}
        component={MainLibrary}
      />
      <Route
        path={`/editor`}
        component={MainEditor}
      />
    </Switch>
  )
}
