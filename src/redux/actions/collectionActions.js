import { collectionConstants } from '../constants/collectionConstants'
import { getUserCollections, getCollectionById, postCollection, postCard } from '../../utils/Api'

const userCollections = (userId) => {
  return dispatch => {
    dispatch(request())
    getUserCollections(userId)
      .then(res => {
        console.log(res)
        dispatch(success(res?.data?.collections))
      })
      .catch(err => {
        console.error(err)
        dispatch(failure(err?.response?.data))
      })
  }
  function request() { return {type: collectionConstants.USER_COLLECTION_REQUEST}}
  function success(collections) { return {type: collectionConstants.USER_COLLECTION_SUCCESS, collections}}
  function failure(error) { return {type: collectionConstants.USER_COLLECTION_FAILURE, error}}
}

const collectionById = (id) => {
  return dispatch => {
    dispatch(request())
    getCollectionById(id)
      .then(res => {
        console.log(res)
        dispatch(success(res.data))
      })
      .catch(err => {
        console.error(err)
        dispatch(failure(err?.response?.data))
      })
  }
  function request() { return {type: collectionConstants.COLLECTION_REQUEST}}
  function success(collection) { return {type: collectionConstants.COLLECTION_SUCCESS, collection}}
  function failure(error) { return {type: collectionConstants.COLLECTION_FAILURE, error}}
}

const createCollection = (collection) => {
  return dispatch => {
    dispatch(request())
    postCollection(collection)
      .then(res => {
        console.log(res)
        dispatch(success(res.data))
      })
      .catch(err => {
        console.error(err)
        dispatch(failure(err?.response?.data))
      })
  }
  function request() { return {type: collectionConstants.CREATE_COLLECTION_REQUEST}}
  function success(collection) { return {type: collectionConstants.CREATE_COLLECTION_SUCCESS, collection}}
  function failure(error) { return {type: collectionConstants.CREATE_COLLECTION_FAILURE, error}}
}

const createCards = (cards) => {
  return dispatch => {
    dispatch(request())
    // postCard(cards[0])
    // .then(card => {
    //   console.log('cards uploaded', card)
    //   // const ids = values.map(card => (card.id))
    //   dispatch(success(card.id))
    // })
    // .catch(err => dispatch(failure(err?.response?.data)))

    const promises = cards.map(card => postCard(card))

    Promise.all(promises)
      .then(values => {
        console.log('cards uploaded', values)
        const ids = values.map(card => (card?.data?.id))
        dispatch(success(ids))
      })
      .catch(err => dispatch(failure(err?.response?.data)))
  }
  function request() {      return {type: collectionConstants.CREATE_CARDS_REQUEST}}
  function success(ids) {   return {type: collectionConstants.CREATE_CARDS_SUCCESS, ids}}
  function failure(error) { return {type: collectionConstants.CREATE_CARDS_FAILURE, error}}
}

export {
  userCollections,
  collectionById,
  createCollection,
  createCards
}