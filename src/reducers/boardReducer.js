//import types for the reducer
import { FETCH_BOARDS, ADD_NEW_BOARD, FETCH_BOARD, REMOVE_BOARD } from '../actions/types';
const initialState = {
  items: [],
  item: {}
};

/*
User Reducer: Reads the action type and executes some non-mutating
data processing. Returns a copy of a new state to 
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOARDS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_NEW_BOARD:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_BOARD:
      return {
        ...state,
        item: action.payload
      };
    case REMOVE_BOARD:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}
