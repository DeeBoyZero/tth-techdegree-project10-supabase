import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Import all the required components for the app
import Courses from "./components/Courses";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
// Import the withContext helper (HOC)
import withContext from './Context';
// Import the PrivateRoute HOC
import PrivateRoute from './PrivateRoute';

// Provides context to the components
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


export default function App() {

  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses">
            <Redirect to="/" />
          </Route>
          <Route path="/courses/:id/detail" component={CourseDetailWithContext} />
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}