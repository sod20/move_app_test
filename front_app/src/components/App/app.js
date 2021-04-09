import React from 'react';
import './app.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Layout, Menu} from 'antd';
import Dashboard from '../Dashboard/dashboard';
import Login from '../Login/login';
import Register from '../Register/register';
import Contacts from '../Contact/contact';
import useToken from './useAuthToken';

const { Header, Content, Footer } = Layout;

function App() {
    
    const { token, setToken } = useToken();
    
    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
      <Layout className="layout">
        <Header>
        <BrowserRouter>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/contacts">Contacts</Link></Menu.Item>
            </Menu>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/register">
              <Register setToken={setToken}/>
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
          </Switch>
        </BrowserRouter>
        </Header>
      </Layout>
    );
  }
  
  export default App;