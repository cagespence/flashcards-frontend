import { collectionConstants } from '../constants/collectionConstants'
const initialState = {
  loading: false,
  collections: [],
  collectionCache: [],
  createdCards: []
}

export const collections = (state = initialState, action) => {
  switch (action.type) {
    case collectionConstants.USER_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case collectionConstants.USER_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: action.collections
      }
      case collectionConstants.COLLECTION_REQUEST:
      return {
        ...state,
        loading: true
      }
    case collectionConstants.COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        collectionCache: [...state.collectionCache, action.collection]
      }
    case collectionConstants.CREATE_CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        createdCards: []
      }
    case collectionConstants.CREATE_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        createdCards: action.ids
      }
    case collectionConstants.CREATE_CARDS_FAILURE:
      return {
        ...state,
        loading: false,
        createdCards: [],
        error: action.error
      }
    case collectionConstants.CREATE_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case collectionConstants.CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: [...state.collections, action.collection]
      }
    case collectionConstants.CREATE_COLLECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default: return state;
  }
}