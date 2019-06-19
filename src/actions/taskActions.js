import { FETCH_TASKS, ADD_NEW_TASK, REMOVE_TASK } from './types';
import axios from 'axios';

const fetchTasks = (task) => {
  return{
    type: FETCH_TASKS,
    payload: task
  }
}

const addNewTask = (newTask) => {
  return {
      type: ADD_NEW_TASK,
      payload: newTask
  }
}

const removeTask = (taskId) => {
  return{
    type: REMOVE_TASK,
    payload: taskId
  }
}



// ************************************ THUNK CREATORS ************************************
export const fetchAllTasks = () => dispatch => {
  console.log('dispatch')
  return axios
  .get('/api/tasks')
    .then(res => res.data)
    .then(data => dispatch(fetchTasks(data)))
    .catch(err => console.log(err));
};

export const addNewTaskThunk = (task) => (dispatch) => {
  return axios 
      // axios.post because we are ADDING a new task
      // remember, axios can GET, POST, PUT, DELETE
      .post("/api/tasks", task)
      .then(response => response.data)
      .then(data => dispatch(addNewTask()))
      .catch(err => console.log(err));
}

//work on delete
export const deleteTaskThunk = (taskId) => (dispatch) => {
  return axios 
      // axios.post because we are ADDING a new task
      // remember, axios can GET, POST, PUT, DELETE
      .delete("/api/tasks", taskId)
      .then(response => response.data)
      .then(data => dispatch(removeTask()))
      .catch(err => console.log(err));
}