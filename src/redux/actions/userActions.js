import { userConstants } from '../constants/userConstants'
import { loginUser, registerUser, validateToken, updateToken } from '../../utils/Api'
const storage = window.localStorage;

const register = (username, email, password) => {
  return dispatch => {
    dispatch(request())
    registerUser(username, email, password)
      .then(res => {
        dispatch(success(res.data))
      })
      .catch(err => {
        dispatch(failure(err?.response?.data))
      })
  }
  function request() { return {type: userConstants.REGISTER_REQUEST}}
  function success(user) { return {type: userConstants.REGISTER_SUCCESS, user}}
  function failure(error) { return {type: userConstants.REGISTER_FAILURE, error}}
}

const login = (identifier, password) => {
  return dispatch => {
    dispatch(request())
    loginUser(identifier, password)
      .then(res => {
        const token = res.data.jwt
        const user = res.data.user
        dispatch(success(res.data.user, token))
        updateToken(token)
        storage.setItem('token', token)
        storage.setItem('user', user)
      })
      .catch(err => {
        dispatch(failure(err?.response?.data))
      })
  }
  function request() { return {type: userConstants.LOGIN_REQUEST}}
  function success(user, token) { return {type: userConstants.LOGIN_SUCCESS, user, token}}
  function failure(error) { return {type: userConstants.LOGIN_FAILURE, error}}
}

const logout = () => {
  return dispatch => {
    dispatch(request())
    storage.removeItem('token')
    storage.removeItem('user')
    updateToken(undefined)
  }
  function request() { return {type: userConstants.LOGOUT_REQUEST}}
}

const validate = (token) => {
  return dispatch => {
    dispatch(request())
    validateToken(token)
      .then(res => {
        storage.setItem('user', res.data)
        dispatch(success(res.data, token))
      })
      .catch(err => {
        storage.removeItem('token')
        storage.removeItem('user')
        updateToken(undefined)
        dispatch(failure())
      })
  }
  function request() { return {type: userConstants.VALIDATE_REQUEST}}
  function success(user, token) { return {type: userConstants.VALIDATE_SUCCESS, user, token}}
  function failure() { return {type: userConstants.VALIDATE_FAILURE}}
}

export {
  register,
  login,
  logout,
  validate
}