import axios from 'axios';

import { POST_LOADED,DELETE } from '../actions/types';
import { showAlert } from './../extra/extra'

export const loadPost = () => dispatch => {
       console.log("yo2")

    axios.get('/post/get',{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
        .then(response => {
          console.log("yooooo",response.data.post)
                    dispatch({
                          type: POST_LOADED,
                          payload: response.data.post
                      })
              })
          
        .catch((err)=> console.log(err))         
}

export const softDelete = (id) => dispatch => {
  axios.patch('/post/delete',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
.then(response => {
          console.log(response)
              
              })
          
        .catch((err)=> console.log(err))
                          dispatch({
                                    type: DELETE,
                                    payload:id
                                  })
                      
}