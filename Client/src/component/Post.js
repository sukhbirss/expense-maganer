import React,{useState} from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Post = ( { auth:{user} }) => {
	// now
	const [category, setCategory] = useState("category")
    const [amount,setAmount] = useState("")
    const [expenseDate,setExpenseDate] = useState("")
    const [itemName,setItemName] = useState("")


    const postData = () =>{
    	console.log("asdka")
    fetch("/post/add",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          },  
        body:JSON.stringify({category,amount,expenseDate,itemName})
        })

        .then(res=>res.json())
        .then(data => {
          console.log(data)
          if(data.status === "success"){
              window.location.reload()

            }
          })
        .catch(err =>console.log(err))

      }
	return (
		    <>

		   			<div className="row m-0 mt-5 pb-4">
					   	<div className="col ">
					  		<button type="button" className="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#exampleModalCenter">Add Expenses</button>
						</div>
					</div>

			    	<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					  <div className="modal-dialog modal-dialog-centered" role="document">
					    <div className="modal-content">
					      <div className="modal-header">
					        <h5 className="modal-title" id="exampleModalLongTitle">Add Expense Details</h5>
					        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
					      </div>
					      <div className="modal-body">
							 <div className="row m-0 mb-3 ">
							    <div className="dropdown">
								  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								    {category}
								  </button>
								  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
								  	{user.categoreis.map(el => (
								    	<button className="dropdown-item" onClick={() => setCategory(el)}>{el}</button>
								  		))}
								  </div>
								</div>
							</div>
							<div className="row m-0 mb-3">
							    <div className="col d-flex justify-content-center">
								    <input type="text"  id="text" placeholder="amount" value={amount}  onChange={e => setAmount(e.target.value)} />
						    	</div>
							</div>  
							<div className="row m-0 mb-3">
							    <div className="col d-flex justify-content-center">
								    <input type="text"  id="text" placeholder="date" value={expenseDate}  onChange={e => setExpenseDate(e.target.value)} />
						    	</div>
							</div>
							<div className="row m-0 mb-3 ">
							    <div className="col d-flex justify-content-center">
								    <input type="text"  id="text" placeholder="item name" value={itemName}  onChange={e => setItemName(e.target.value)} />
						    	</div>
							</div>       
					      </div>
					      <div className="modal-footer">
					        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					        <button type="button" className="btn btn-primary add" onClick={()=>postData()}>Add</button>

					      </div>
					    </div>
					  </div>
					</div>

		    </>
	)
};



Post.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Post);