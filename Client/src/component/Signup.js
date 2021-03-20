import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import '../styles/signup.css'
import { Link } from 'react-router-dom'
import { showAlert,changeHtml } from './../extra/extra'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from "./../actions/user_actions";

const Signup = ({ signup, auth: { token,isAuthenticated,error } }) => {
  	const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");

    const validateForm = () => {return name.length > 0 && passwordConfirm.length >0 && email.length > 0 && password.length > 0;}
    let dataToSubmit = {name,
                email,
                password,
                passwordConfirm
              };

    const handleSubmit = (event) => {
        event.preventDefault();
		if(password === passwordConfirm){
	        signup(dataToSubmit);
	         
	      	}else{
	      		  showAlert('erorr', 'password and confirm Password doest match');  

	      	}
      }

         if(!error && isAuthenticated){         
	               showAlert('success', 'signup successfully!');  
	               localStorage.setItem('jwt', token);
	          	   history.push('/home')
	             }
	          else if(error !== null) {
	                showAlert('error', error);  
	          }
    
    


	return (

		    <>
			    <div className="wrapper">
			      <div className="whitebox2">
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
							<div className="row m-0 pt-1 ">
							    <div className="col d-flex justify-content-center">
					        		<input type="text" placeholder="Enter Name" className="text" onChange={e => setName(e.target.value)} required="" value={name} />
							    </div>
							</div>
							<div className="row m-0 pt-3 ">
							    <div className="col d-flex justify-content-center">
					        		<input type="text" placeholder="Enter email" className="text" onChange={e => setEmail(e.target.value)} required="" value={email} />
							    </div>
							</div>
							<div className="row m-0 mt-3 ">
							    <div className="col d-flex justify-content-center">
					        		<input type="password" placeholder="Enter password" className="text" required="" onChange={e => setPassword(e.target.value)} value={password} />
							    </div>
							</div>
							<div className="row m-0 mt-3 ">
							    <div className="col d-flex justify-content-center">
					        		<input type="password" placeholder="Enter password" className="text" required="" onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
							    </div>
							</div>
							<div className="row m-0  mt-5 ">
							    <div className="col d-flex justify-content-center">
					        		<button type="button" disabled={!validateForm()} type="submit" id="btn-login" className="btn btn-outline-primary btn-login">Signup</button>
							    </div>
							</div>
						</form>
			      </div> 
			         	
			    </div>
		    </>
	)
};


Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signup })(Signup);