import axios, { post, get } from 'axios'

const baseUrl = 'http://192.168.2.1:1337'

let token = window.localStorage.getItem('token')

const loginUrl = '/auth/local'
const registerUrl = '/users'
const validateUrl = '/users/me'
const userUrl = '/users/'
const collectionUrl = '/collections/'
const cardUrl = '/cards'

const loginUser = (identifier, password) => {
  return post(baseUrl + loginUrl, {
    identifier,
    password
  })
}

const registerUser = (username, email, password) => {
  return post(baseUrl + registerUrl, {
    username, 
    email, 
    password
  })
}

const validateToken = (token) => {
  return get(baseUrl + validateUrl, {
    headers: {'Authorization': `Bearer ${token}`}
  })
}

const updateToken = (newToken) => {
  token = newToken
}

const getUserCollections = (userId) => {
  return get(baseUrl + userUrl + userId, {
    headers: {'Authorization': `Bearer ${token}`}
  })
}

const getCollectionById = (id) => {
  return get(baseUrl + collectionUrl + id,{
    headers: {'Authorization': `Bearer ${token}`}
  })
}

const postCollection = (collection) => {
  return axios({
    method: 'POST',
    url: baseUrl + collectionUrl,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: collection
  })
}

const postCard = (card) => {
  return axios({
    method: 'POST',
    url: baseUrl + cardUrl,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: card
  })
}

export {
  registerUser,
  loginUser,
  validateToken,
  updateToken,
  getUserCollections,
  getCollectionById,
  postCollection,
  postCard
}