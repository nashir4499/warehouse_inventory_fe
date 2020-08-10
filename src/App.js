import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';
// import './App.css';

function App(props) {

  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(existingTokens);

  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // }


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
