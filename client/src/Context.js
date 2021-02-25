import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
  // Setup the context states
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    currentUsername: null,
    currentUserPass: null
  };

  constructor() {
    super();
    this.data = new Data();
  }
  // Checks to see if user is present in the localStorage
  componentDidMount() {
    this.setState(() => {
      return {
        currentUsername: localStorage.getItem('username') || null,
        currentUserPass: localStorage.getItem('password') || null
      }
    })
  }

  render() {
    
    const { authenticatedUser, currentUsername, currentUserPass } = this.state;
    // Provide the states values and actions for the consumers
    const value = {
      authenticatedUser,
      currentUsername,
      currentUserPass,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // User signIn action that setup localStorage for credentials and a HTTP cookie
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      this.setState(() => {
        return {
          authenticatedUser: user,
          currentUsername: username,
          currentUserPass: password
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  // User signOut action that delete localStorage credentials and the HTTP cookie and reset the states to null
  signOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    Cookies.remove('authenticatedUser');
    this.setState(() => { 
      return { 
        authenticatedUser: null,
        currentUsername: null,
        currentUserPass: null
      }
    });
    
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

