import axios from 'axios';
import { LOGIN_SUCCESS,GET_ME,USER_LOADED ,UPDATED,
          DELETE_POST,SIGNUP,ERROR} from '../actions/types';
import store from '../store';
import { showAlert,changeHtml } from './../extra/extra'

export const loginUser = (dataToSubmit) => dispatch => {
    axios.post('/users/login',dataToSubmit)
                .then(response => {
                     dispatch({
                                type: LOGIN_SUCCESS,
                                payload: response.data
                              })

                })
                 .catch((err)=>{
                      dispatch({
                          type: ERROR,
                          payload: err.response.data.message
                        })
                 })         
}
export const signup = (dataToSubmit) => dispatch => {
    
     axios.post('/users/signup',dataToSubmit)           
                               .then(response => {
          
                                    dispatch({
                                          type:SIGNUP ,
                                          payload:response.data
                                      })}
                                    )
                               .catch((err)=>{
                                    dispatch({
                                        type: ERROR,
                                        payload: err.response.data.message
                                      })
                 })  
            
}
export const loadUser = () => dispatch => {

    axios.get('/users/me',{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
              .then(response => {
                      console.log("jatt",response)

                    dispatch({
                          type: USER_LOADED,
                          payload: response.data
                      })

              })
        .catch((err)=>(console.log(err)))   

}
export const updateMe = (data) => dispatch => {
    //changeHtml('Updating',`update${Object.keys(data)[0]}`)
    showAlert('success',`UPDATING ${Object.keys(data)[0]}`)
    axios.patch('/users/updateme',data,{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
                .then(response =>{
                          dispatch(loadUser());
                          showAlert('success',` ${Object.keys(data)[0]} UPDATED`)

                          })
                .catch((err)=>(err.response))                        
}
export const deleteMyPost = (dataToSubmit) =>{

store.dispatch({
          type: DELETE_POST,
         payload: dataToSubmit.id
      
      })
       
}

export const getMe = (dataToSubmit) => dispatch => {

        fetch("/users/post/mypost",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
        })
        .then(res=>res.json())
        .then(response => {
              dispatch({
                          type: GET_ME,
                          payload: response
                      })
            }
                  )  
        .catch((err)=>(console.log("error",err)))         
}

