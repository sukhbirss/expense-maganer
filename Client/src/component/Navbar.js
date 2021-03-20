import React from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

	return (
		    <>
			    <div className="navcontainer">
			        <Link to="/home"  style={{ textDecoration: 'none' }}>
			    		<button className="button">Home</button>
			    	</Link >
			    	<Link to="/settings">
			    		<button className="button">setings</button>
			    	</Link >
			   		<button className="button" onClick={()=>{localStorage.clear();window.location.replace("/login")}}>Logout</button>
			    </div>
		    </>
	)
};


export default Navbar

