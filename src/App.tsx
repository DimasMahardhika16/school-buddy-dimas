import { Route, Switch } from "wouter";
import { LoginPage } from "./page/login";
import { DashboardPage } from "./page/dashboard";

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}

export default App;
