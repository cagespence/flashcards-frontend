import { userConstants } from '../constants/userConstants'
const initialState = {
  loading: false,
  user: false,
  token: false,
  error: undefined
}

export const login = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loading: true
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.user,
        token: action.token
      }
    case userConstants.LOGIN_FAILURE:
      return {
        loading: false,
        error: action.error
      }
    case userConstants.LOGOUT_REQUEST:
      return initialState
    case userConstants.VALIDATE_SUCCESS:
      return {
        user: action.user,
        token: action.token,
        loading: false
      }
    default: return state;
  }
}