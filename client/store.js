import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

//Action creator

const SET_USER = 'SET_USER';

const setUser = user => ({
  type: SET_USER,
  user,
});

const login = user => async dispatch => {
  try {
    const response = await axios.post('/auth/', user);
    console.log(`User Found ${response}`);
    return dispatch(setUser(response.data));
  } catch (error) {
    //console.log(error);
    return error;
  }
};

const getUser = () => async dispatch => {
  try {
    const response = await axios.get('/auth/');
    console.log(response.data);
    if (response.data) {
      return dispatch(setUser(response.data));
    } else {
      return new Error('Session Not Found');
    }
  } catch (error) {
    return error;
  }
};

const logout = () => async dispatch => {
  try {
    const response = await axios.delete('/auth/');
    return dispatch(setUser({}));
  } catch (error) {
    console.log(error);
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
});

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export { login, getUser, logout };
