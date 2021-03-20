import React,{ useEffect } from 'react';
import Settings from './component/settings'
import Signup from './component/Signup'
import Home from './component/Home'
import Login from './component/Login'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/user_actions";

import { Route,Switch } from 'react-router-dom'

const Routing = ()=>{
  return(
  			<Switch>
			    <Route exac path="/home" component={Home}/>
   			    <Route exac path="/login" component={Login}/>
			    <Route exac path="/settings" component={Settings}/>		    
			    <Route exac path="/signup" component={Signup}/>
			</Switch>
  )
}

const App = () => {
  useEffect(() => {

  	if(localStorage.jwt){
  		store.dispatch(loadUser());
  	}

    if (!localStorage.getItem("jwt") && window.location.pathname !=="/login") {
		window.location.replace("/login");
    }

  }, []);

	return (
		<>
			<Provider store={store}>
 			 	<Routing />
    		</Provider>
		</>
		);
};
export default App;