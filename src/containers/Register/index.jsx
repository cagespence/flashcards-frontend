import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Form, FormSubmitButton, FormElement } from '../../components/Form'
import { register } from '../../redux/actions/userActions'
import { PageTitle } from '../../components/Elements/PageTitle'
import Loading from '../../components/Elements/Loading'
import { useHistory } from 'react-router-dom'

const Register = ({loading, user, error}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(register(username, email, password))
  }

  useEffect(() => {
    if (user) history.push('/login')
  }, [user])

  return (
    <>
      <PageTitle>
        Register to create your own collections and start memorizing
      </PageTitle>
      <Form onSubmit={handleRegister}>
        <FormElement
            id='username'
            type='text'
            value={username}
            handleChange={setUsername}
          />
        <FormElement
          id='email'
          type='email'
          value={email}
          handleChange={setEmail}
        />
        <FormElement 
          id='password' 
          type='password'
          value={password}
          handleChange={setPassword}/>
        <FormSubmitButton type='submit'>
          { loading? 
            <Loading/> : 
            'Register'
          }</FormSubmitButton>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.register.loading,
  user: state.register.user,
  error: state.register.error,
})

export default connect(mapStateToProps)(Register)