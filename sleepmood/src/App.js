import React from 'react';
import './App.css';
import {  Route } from "react-router-dom";
import  PrivateRoute from './components/PrivateRoute';

import Home from './components/Home';
import CreateSleepEntry from './components/CreateSleepEntry';
import NavBar from './components/Navbar';
import SleepHistory from './components/HistoryComponents/SleepHistory';
import SleepEntryList from  './components/SleepEntryList'
import Help from './components/Help';
import LandingPage from './components/LandingPage';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import SleepEntryForm from './components/SleepEntryForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path='/' component={LandingPage} />
      <Route path='/login' component={Login} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute exact path='/home' component={Home} />
      <PrivateRoute path="/CreateSleepEntry" component={SleepEntryForm} />
      <PrivateRoute path='/SleepHistory' component={SleepHistory} />
      <PrivateRoute path='/Help' component={Help} />
      <PrivateRoute path='/SleepEntryList' component={SleepEntryList} />
    </div>
  );
}

export default App;

//yes