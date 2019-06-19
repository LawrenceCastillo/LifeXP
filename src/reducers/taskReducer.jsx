import { FETCH_TASKS, FETCH_TASK, ADD_NEW_TASK, REMOVE_TASK } from '../actions/types';
const initialState = {
  items: [],
  item: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_NEW_TASK:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_TASK:
      return {
        ...state,
        item: action.payload
      };
    case REMOVE_TASK:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}
