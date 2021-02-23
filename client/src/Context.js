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

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevState.currentUsername !== this.state.currentUsername) {
  //     console.log('currentUsername state has changed');
  //   }
  // }

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

