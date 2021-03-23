import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from "./pages/Main";
import MainLayout from "./components/MainLayout";
import MainContext from "./context";
import TextBook from "./components/TextBook/Textbook"

function App() {
  return (
    <Router>
      <div className="App">
        <MainContext>
          <MainLayout>
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path ="/textbook/:id" exact component={TextBook} />
            </Switch>
          </MainLayout>
        </MainContext>
      </div>
    </Router>
  );
}

export default App;
