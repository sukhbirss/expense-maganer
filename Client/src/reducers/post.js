import { POST_LOADED,DELETE } from '../actions/types';

const initialState = {
  allpost: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {

    case POST_LOADED:
      return {
        allpost:payload
        };
    
    case DELETE:
      return {
        ...state,
        allpost:state.allpost.filter(el => el._id !== payload)
                              
        }
    default:
      return state;
  }
}
