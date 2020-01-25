import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
    return (
        <Router>
            <NavBar />
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
