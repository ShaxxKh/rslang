/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import MainLayout from './components/MainLayout';
import SignUp from './pages/AuthPage/SignUp/SignUp';
import SignIn from './pages/AuthPage/SignIn/SignIn';
import MainContext from './context';
import Learning from './pages/Learning';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <MainContext>
          <MainLayout>
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/sign-in" component={SignIn} />
              <ProtectedRoute path="/learning" component={Learning} />
              {/* <Route path="/learning" component={Learning} /> */}
            </Switch>
          </MainLayout>
        </MainContext>
      </div>
    </Router>
  );
}

export default App;
