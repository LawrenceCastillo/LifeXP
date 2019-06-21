import {AUTHENTICATED,UNAUTHENTICATED,AUTHENTICATED_ERROR} from '../actions/types';

export default function(state={}, action){
  switch(action.type){
    case AUTHENTICATED:
      return{
        ...state,
        authenticated: true
      };
    case UNAUTHENTICATED:
      return{
        ...state,
        authenticated: false
      };
    case AUTHENTICATED_ERROR:
      return{
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}