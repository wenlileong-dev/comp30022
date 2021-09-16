import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App.js';
import Account from './pages/Account.js';
import Contact from './pages/Contact.js';
import Calendar from './pages/Calendar.js';
import Dashboard from './pages/Dashboard.js';
class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}></Route>
                    <Route path="/dashboard" exact component={Dashboard}></Route>
                    <Route path="/account" exact component={Account}></Route>
                    <Route path="/contact" exact component={Contact}></Route>
                    <Route path="/calendar" exact component={Calendar}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router;