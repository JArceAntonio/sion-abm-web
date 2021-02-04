import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'sweetalert2/src/sweetalert2.scss'
import Layout from "./components/Layout";
import PersonList from "./pages/PersonList";
import CreatePerson from "./pages/CreatePerson";
import EditPerson from "./pages/EditPerson";
import AddButton from "./components/AddButton";



function App() {
  return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <PersonList/>
            </Route>

            <Route exact path="/create">
              <CreatePerson/>
            </Route>

            <Route exact path="/deleted">
              <CreatePerson/>
            </Route>

            <Route exact path="/edit/:userId">
              <EditPerson/>
            </Route>
          </Switch>
        </Layout>
        <AddButton/>
      </Router>

  );
}

export default App;
