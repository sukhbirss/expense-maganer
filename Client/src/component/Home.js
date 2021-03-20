import React,{useState,useEffect} from 'react';
import Navbar from './Navbar'
import Table from './Table'
import Pagination from './Pagination'
import Post from './Post'
import { loadPost } from "../actions/post_actions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/home.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {Pie} from 'react-chartjs-2';

const Home = ({ loadPost, post:{allpost},auth:{user}}) => {

	useEffect(()=>{
    loadPost(); 

	},[loadPost]);
  let lab = [];
  let dat = [];
  let total = 0;
  let result = [];
  let percentage= 0;
  let currentPosts;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

if(allpost && user){
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  currentPosts = allpost.slice(indexOfFirstPost, indexOfLastPost);

	allpost.forEach(item => {
    total += item.amount;
});
  
  percentage = (total/user.budget)*100

//Chart Calculations


allpost.reduce(function(res, value) {
  if (!res[value.category]) {
    res[value.category] = { category: value.category, amount: 0 };
    result.push(res[value.category])
  }
  res[value.category].amount += value.amount;
  return res;

}, {});

console.log(result)
result.map(el=>(lab.push(el.category)))
result.map(el=>(dat.push(el.amount)))
}
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


	return (
		    <>
		    {user ?
		    	<>
		    	<Navbar />
				<div className="homecontainer">
				    <div className="row m-0 ">
					    <div className="col mx-auto">
						   	<div className="box mx-auto">
						   		<div className=" line">
					    			<h4>Budget overview</h4>
					    		</div>
					    		<CircularProgressbar value={percentage} text={`${percentage}%`} />;
								<div className="details">
							    	<div className="details1">
							    		<p>Total Budget </p>
						    		</div>
						    		<div className="details2">
						    			<p>amount left</p>
						    		</div>
							    </div> 
							    <div className="details">
							    	<div className="details1">
							    		<p>{user.budget}</p>
						    		</div>
						    		<div className="details2">
						    			<p>{user.budget-total}</p>
						    		</div>
							    </div>     
							</div>
					    </div>

					    <div className="col mx-auto">
					   	 <div className="box mx-auto">
					   		<div className=" line">
				    			<h4>category wise split</h4>
				    		</div>	
				    		<div className="pie">
				    			<Pie
									        data={{
									          labels: lab,
									          datasets: [
									            {
									              label: '# of votes',
									              data: dat,
									              backgroundColor: [
									                'rgba(255, 99, 132, 0.2)',
									                'rgba(54, 162, 235, 0.2)',
									                'rgba(255, 206, 86, 0.2)',
									                'rgba(75, 192, 192, 0.2)',
									                'rgba(153, 102, 255, 0.2)',
									                'rgba(255, 159, 64, 0.2)',
									              ],
									              borderColor: [
									                'rgba(255, 99, 132, 1)',
									                'rgba(54, 162, 235, 1)',
									                'rgba(255, 206, 86, 1)',
									                'rgba(75, 192, 192, 1)',
									                'rgba(153, 102, 255, 1)',
									                'rgba(255, 159, 64, 1)',
									              ],
									              borderWidth: 1,
									            },
	
									          ],
									        }}
									        height={200}
									        width={400}
									        options={{
									          maintainAspectRatio: false,
									          
									          legend: {
									            labels: {
									              fontSize: 15,
									            },
									          },
									        }}
     							 />
				    		</div>
				    		 
				    	 </div>
				    	</div>
					   
					</div>
					
					<Post/>
					{allpost && currentPosts ?
						<>
							<Table posts={currentPosts} loading={loading} />
							<div className="row m-0">
							   	<div className="col d-flex justify-content-center">
								<Pagination
							        postsPerPage={postsPerPage}
							        totalPosts={allpost.length}
							        paginate={paginate}
							      />
							      
						   		 </div>
							</div>
						</>
					:
					<p>sad</p>
				}
					
			    </div>
			</>
			:
			<p>loading</p>
		}
		    </>
	)
};


Home.propTypes = {
  loadPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { loadPost})(Home);