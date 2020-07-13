import { userConstants } from '../constants/userConstants'

const initialState = {
  loading: false,
  user: false,
  error: undefined
}

export const register = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        loading: true
      }
    case userConstants.REGISTER_SUCCESS:
      return {
        loading: false,
        user: action.user
      }
    case userConstants.REGISTER_FAILURE:
      return {
        loading: false,
        error: action.error
      }
    default: return state;
  }
}