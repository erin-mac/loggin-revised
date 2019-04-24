import { createStore, applyMiddleware, combineReducers } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

//Action creator

const SET_USER = 'SET_USER'

const setUser = users => ({
  type: SET_USER,
  users
})


const login = ({ email, password }) => dispatch => {
  try {
    const response = axios.post('/auth/', { email, password })
    return dispatch(setUser(response))
  } catch (error) { console.log(error) }
}

const getUser = () => dispatch => {
  try {
    const response = axios.get('/auth/')
    return dispatch(setUser(response))
  } catch (error) { console.log(error) }
}

const logout = () => dispatch => {
  try {
    const response = axios.delete('/auth/')
    return dispatch(setUser({}))
  } catch (error) { console.log(error) }
}

const userReducer = (state = { email: 'emcaweeney@gmail.com', password: '123' }, action) => {
  switch (action.type) {
    case SET_USER:
      return (user)
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
