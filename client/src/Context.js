import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    currentUsername: null,
    currentUserPass: null
  };

  constructor() {
    super();
    this.data = new Data();
  }

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

