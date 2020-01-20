import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// import ResumeEditor from './components/ResumeEditor';
import NavBar from './components/NavBar';

const App = () => {
    return (
        <Router>
            <NavBar />
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    {/* <Route exact path="/editor" component={ResumeEditor} /> */}
                </Switch>
            </div>
        </Router>
    );
}

export default App;
