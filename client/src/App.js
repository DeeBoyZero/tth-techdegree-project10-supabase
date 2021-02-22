import './App.css';
import React, { useState } from 'react';
import Data from './Data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Cookies from 'js-cookie';
import PrivateRoute from './PrivateRoute';

import Courses from "./components/Courses";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

export default function App() {

  const data = new Data();

  const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.getJSON('authenticatedUser') || null)

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      setAuthenticatedUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  const signUp = async (user) => {
    const res = await data.createUser(user);
    if ( res === [] ) {
      setAuthenticatedUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return res;
  }

  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove('authenticatedUser');
  }

  return (
    <Router>
      <Header authenticatedUser={authenticatedUser} />
      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>
        <Route exact path="/courses">
          <Redirect to="/" />
        </Route>
        <Route path="/courses/:id/detail" component={CourseDetail} />
        <PrivateRoute exact path="/courses/create" authenticatedUser={authenticatedUser} component={CreateCourse} />
        <PrivateRoute exact path="/courses/:id/update" authenticatedUser={authenticatedUser} component={UpdateCourse} />
        <Route path="/signin">
          <UserSignIn signIn={signIn} />
        </Route> 
        <Route path="/signup">
          <UserSignUp signUp={signUp} signIn={signIn} />
        </Route>
        <Route path="/signout">
          <UserSignOut signOut={signOut} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}