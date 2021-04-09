import React, { useState } from 'react';
import './app.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button } from 'antd';
import Dashboard from '../Dashboard/dashboard';
import Login from '../Login/login';
import Preferences from '../Preferences/preferences';
import Contacts from '../Contact/contact';
import useToken from './useAuthToken';

function App() {
    
    const { token, setToken } = useToken();
    
    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;