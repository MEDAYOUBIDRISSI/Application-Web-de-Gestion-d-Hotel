import React, { Component } from 'react';
import Index from './components/Dash_index';
import ListEspace from './components/Espace/ListEspace';
import ListEmp from './components/ParteEmp/ListEmp';
import ListTache from './components/ParteEmp/ListTache';
import ListProduit from './components/Produit/ListProduit';
import ListTable from './components/ParteRestauration/ListTable';
import LeurTache from './components/ParteEmp/LeurTache';
import TacheValide from './components/ParteEmp/TacheValide';
import LeurCmd from './components/Reservation/LeurCmd';
import MailBox from './components/Mail/MailBox';
import MailBoxPrive from './components/Mail/MailBoxPrive';
import Reservation_rec from './components/Reservation/Reservation_rec';
import Reservation_OnAttende from './components/Reservation/Reservation_OnAttende';
import Reservation_valide from './components/Reservation/Reservation_valide';
import Reservation_pasvalide from './components/Reservation/Reservation_pasvalide';
import ListChart from './components/Chartjs/ListChart';
import Login from './components/Auth/SignIn';
import ListRestauration from './components/ParteRestauration/ListRestauration_cl';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() { 
    return (
        <Router>
          <Switch>
            <Route exact component={Index} path="/listclient"></Route>
            <Route component={ListEspace} path="/listespace"></Route>
            <Route component={ListEmp} path="/listemp"></Route>
            <Route component={ListTache} path="/listtache"></Route>
            <Route component={ListProduit} path="/listproduit"></Route>
            <Route component={LeurTache} path="/leurtache"></Route>
            <Route component={TacheValide} path="/tachevalide"></Route>
            <Route component={LeurCmd} path="/leurcmd"></Route>
            <Route component={MailBox} path="/mailbox"></Route>
            <Route component={MailBoxPrive} path="/mailboxprive"></Route>
            <Route component={Reservation_rec} path="/res"></Route>
            <Route component={Reservation_OnAttende} path="/resonattende"></Route>
            <Route component={Reservation_pasvalide} path="/respasvalide"></Route>
            <Route component={Reservation_valide} path="/resvalide"></Route>
            <Route component={ListTable} path="/listtable"></Route>
            <Route component={ListRestauration} path="/listrestauration"></Route>
            <Route component={ListChart} path="/index"></Route>
            <Route component={Login} path="/login"></Route>
          </Switch>
        </Router>
    );
  } 
}
export default App;