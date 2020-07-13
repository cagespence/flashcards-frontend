import React, { useEffect } from 'react';
import Home from './containers/Home'
import Login from './containers/Login'
import Register from './containers/Register'
import Collections from './containers/Collections'
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { NavBar, NavBarLink, NavCollapse, NavHome }  from './components/Elements/NavBar';
import { ReviewContainer }  from './components/Elements/ReviewCard';
import { connect, useDispatch } from 'react-redux';
import { logout, validate } from './redux/actions/userActions';
import Loading from './components/Elements/Loading';
import Container from './components/Elements/Container';
import Centered from './components/Elements/Centered';
import Collection from './containers/Collection';

const LoginButton = styled.button`
  background-color: var(--color-dark);
  font-family: 'Raleway';
  font-weight: 600;
  border: none;
  font-size: 1.5rem;
  padding: .5rem;
  cursor:pointer;
  margin-top: -1rem;
`

function App({user, token, loading}) {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem('token')
    if (tokenFromStorage && !user) {
      console.log(tokenFromStorage)
      dispatch(validate(tokenFromStorage))
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <Router>
        <div>
            <NavBar>
              <NavHome>
                <NavBarLink to='/'>FLASHCARDS</NavBarLink>
              </NavHome>
              {!user ? 
                <>
                  <NavBarLink to='/login'>
                    <LoginButton>
                      login
                    </LoginButton>
                  </NavBarLink>
                  <NavBarLink to='/register'>register</NavBarLink>
                </> : 
                <NavCollapse>
                  <NavBarLink to='/collections'>
                    collections
                  </NavBarLink>
                  <NavBarLink onClick={handleLogout}>log out</NavBarLink>
                </NavCollapse>
                }
            </NavBar>
          {loading ? 
            <Centered>
              <Loading light/>
            </Centered> :
            <Switch>
              <Route exact path='/'>
                <Container>
                  <Home/>
                </Container>
              </Route>
              <Route path='/login'>
                {!user ? 
                  <Container>
                    <Login/>
                  </Container> :
                  <Redirect to='/'/>
                }
              </Route>
              <Route path='/register'>
                {!user ? 
                  <Container>
                    <Register/>
                  </Container> :
                  <Redirect to='/'/>
                }
              </Route>
              <Route path='/collections'>
                {user ? 
                  <Container>
                    <Collections/>
                  </Container> :
                  <Redirect to='/'/>
                }
              </Route>
              <Route path='/collection/:id'>
                {user ? 
                  <ReviewContainer>
                    <Collection/>
                  </ReviewContainer> :
                  <Redirect to='/'/>
                }
              </Route>
            </Switch>
          }
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.user,
  token: state.login.token,
  loading: state.login.loading,
})

export default connect(mapStateToProps)(App)