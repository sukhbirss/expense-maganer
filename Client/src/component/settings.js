import React,{useState} from 'react';
import Navbar from './Navbar'
import { updateMe } from "../actions/user_actions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/settings.css'


const Settings = ({ updateMe,auth: {user} }) => {
	const [budget,setBudget] = useState('');
	const [category,setCategory] = useState('');



	return (
		    <> 
		    {user ?
		    	<>
		    	<Navbar />
				<div className="homecontainer">
				    <div className="row m-0 ">
					    <div className="col d-flex justify-content-end">
						   <h5>Total budget</h5>
					    </div>
					    <div className="col d-flex justify-content-center">
						    <input type="text" id="text" placeholder="2000000" value={budget} onChange={e => setBudget(e.target.value)} />
				    	</div>
					   <div className="col d-flex justify-content-start">
					   	 <button type="button" className="btn btn-outline-primary" onClick={() => updateMe({budget})}>Update</button>
				    	</div>
					</div>
					<div className="row m-0 mt-5">
					    <div className="col d-flex justify-content-end">
						   <h5>category</h5>
					    </div>
					    <div className="col d-flex justify-content-center">
						    <input type="text"  id="text" placeholder="category name here" value={category}  onChange={e => setCategory(e.target.value)} />
				    	</div>
					   <div className="col d-flex justify-content-start">
					   	 <button type="button" className="btn btn-outline-primary" onClick={() => updateMe({category})}>Add</button>
				    	</div>
					</div>
					<div className="row m-0 mt-5">
							    <div className="col d-flex justify-content-center">
								   <h3>categoreis</h3>
							    </div>
					</div>
					{user.categoreis.map(el =>(
							<div className="row m-0 mt-5">
							    <div className="col d-flex justify-content-end">
								   <h5>{el}</h5>
							    </div>
							    <div className="col d-flex justify-content-start">
					   			    <button type="button" className="btn btn-outline-primary" onClick={() => updateMe({categoryDelete:el})}>delete</button>
							    </div>
							</div>
						))}

					
			    </div>
			    </>
			    :
			    null
			}
		    </>
	)
};


Settings.propTypes = {
  auth: PropTypes.object.isRequired,
  updateMe: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateMe })(Settings);

