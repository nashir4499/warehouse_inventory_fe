import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';
// import './App.css';

function App(props) {

  return (
    <BrowserRouter>
      <Switch>
        {
          routes.map((route, index) => {
            return (<Route key={index} path={route.path} exact={true} {...props} component={props => {
              return (
                <route.layout {...props}>
                  <route.component {...props} />
                </route.layout>
              )
            }} />)
          })
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
