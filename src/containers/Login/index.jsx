import React, { useState } from 'react'
import { FormElement, FormSubmitButton, Form } from '../../components/Form'
import { login } from '../../redux/actions/userActions'
import { connect, useDispatch } from 'react-redux'
import Loading from '../../components/Elements/Loading'

const Login = ({loading, user, token, error}) => {
  const dispatch = useDispatch()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(identifier, password))
  }

  return (
    <>
      <Form onSubmit={handleLogin}>
        <FormElement
            id='Username or email'
            type='text'
            value={identifier}
            handleChange={setIdentifier}
          />
        <FormElement 
          id='password' 
          type='password'
          value={password}
          handleChange={setPassword}/>
        <FormSubmitButton type='submit'>{
          loading? <Loading/> : 
          'Log in'
        }</FormSubmitButton>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.login.loading,
  user: state.login.user,
  error: state.login.error,
  token: state.login.token,
})

export default connect(mapStateToProps)(Login)