import React from 'react';
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import store from './../store';
import { softDelete } from '../actions/post_actions';

const Table = ({ posts, loading }) => {


	return (
		    <>
					<div className="row m-0">
					   	<div className="col d-flex justify-content-center ">
					   		<table className="table table-striped table-white">
							  <thead>
							    <tr>
							      <th scope="col">category</th>
							      <th scope="col">itemName</th>
							      <th scope="col">amount</th>
							      <th scope="col">date</th>
							      <th scope="col">Delete</th>
							    </tr>
							  </thead>
							  <tbody>
							    {posts.map(post => (

							    <tr>
							      <th scope="row">{post.category}</th>
							      <td>{post.itemName}</td>
							      <td>{post.amount}</td>
							      <td>{post.expenseDate}</td>
							   	  <td><button type="button" class="btn btn-danger" onClick={()=>{store.dispatch(softDelete(post._id))}}>soft Delete</button></td>
							    </tr>
							    ))}
							  </tbody>
							</table>
						</div>
					</div>
		    </>
	)
};


export default Table;

