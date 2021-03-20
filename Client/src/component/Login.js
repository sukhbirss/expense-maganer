import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import '../styles/login.css'
import { Link } from 'react-router-dom'
import { loginUser } from "./../actions/user_actions";
import { showAlert,changeHtml } from './../extra/extra'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Login = ({ loginUser, auth: { token,user,isAuthenticated,error } }) => {
  	const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const validateForm = () => {return email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => {
    	
    	event.preventDefault();
		let dataToSubmit = {
		    		email,
		    		password
		    	}
  		loginUser(dataToSubmit)
      changeHtml('logging...','btn-login')
}

  if(error){
    showAlert('error', error);
    changeHtml('Try Again','btn-login')

  }
  

	if (isAuthenticated) {
		showAlert('success', 'Logged in successfully!');
		localStorage.setItem('jwt', token);
		history.push('/home');

      } 

	return (

		    <>
			    <div className="wrapper">
			      <div className="whitebox">
			      		<div className="row m-0 mt-5 pt-5">
						    <div className="col d-flex justify-content-center">
						    	<h3>Welcome,please login first</h3>
						    </div>
						</div>
						<div className="row m-0 mb-5 ">
						    <div className="col d-flex justify-content-center">
						    	<p>sukhbir's project</p>
						    </div>
						</div>
						<form  onSubmit={handleSubmit} >
							<div className="row m-0 pt-5 ">
							    <div className="col d-flex justify-content-center">
					        		<input type="text" placeholder="Enter email" className="text" onChange={e => setEmail(e.target.value)} required="" value={email} />
							    </div>
							</div>
							<div className="row m-0 mt-3 ">
							    <div className="col d-flex justify-content-center">
					        		<input type="password" placeholder="Enter password" className="text" required="" onChange={e => setPassword(e.target.value)} value={password} />
							    </div>
							</div>
							<div className="row m-0  mt-3 ">
							    <div className="col d-flex justify-content-center">
					        		<button type="button" disabled={!validateForm()} type="submit" id="btn-login" className="btn btn-outline-primary btn-login">Login</button>
							    </div>
							</div>
						</form>
			      </div> 
			      <div className="adjacentbox">
			        	<div className="d-flex justify-content-center ">
						    <h5>dont have an account?</h5><span><Link to="/signup">SignUp</Link></span>
						</div>
			      </div>     	
			    </div>
		    </>
	)
};


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);