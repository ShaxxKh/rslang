/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Main from './pages/Main';
import MainLayout from './components/MainLayout';
import MainContext from './context';

function App() {
  return (
    <Router>
      <div className="App">
        <MainContext>
          <MainLayout>
            <Switch>
              <Route path="/" component={Main} exact />
            </Switch>
          </MainLayout>
        </MainContext>
      </div>
    </Router>
  );
}

export default App;
