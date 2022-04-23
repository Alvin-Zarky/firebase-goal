import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./view/not-found";
import * as Routes from "./router";
import Goal from './view/goal';
import Register from './view/register';
import Login from './view/login';
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import {useContextHook} from "./hook/useContext";

function App() {
  const {user, isAuth} = useContextHook()
  return (
    <>
      {isAuth && (
        <>
          <BrowserRouter>
            <Switch>
              <Route exact path={Routes.HOME}>
                {user && <Goal />}
                {!user && <Redirect to={Routes.LOGIN} />}
              </Route>
              <Route path={Routes.REGISTER}>
                {!user && <Register />}
                {user && <Redirect to={Routes.HOME} />}
              </Route>
              <Route path={Routes.LOGIN}>
                {!user && <Login />}
                {user && <Redirect to={Routes.HOME} />}
              </Route>
              <Route path={Routes.NOT_FOUND}>
                <NotFound />
              </Route>
            </Switch>
          </BrowserRouter>
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default App;
