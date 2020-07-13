import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavBar = styled.nav` 
  display: flex;
  flex-direction: row;
  vertical-align: baseline;
  justify-content: space-between;
  max-width: 1000px;
  width: 90%;
  margin: 1rem auto 3rem;
`

const NavBarLink = styled(Link)`
  margin-right: 4rem;
  font-size: 1.5rem;
  color: var(--color-dark);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:last-child{
    margin-right: 0;
  }
`

const NavHome = styled.div`
  flex-grow: 1;
`

const NavCollapse = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  /* display: none; */
  @media only screen and (max-width: 700px) {
    flex-grow: 0;
    flex-direction: column;
    &>a:first-child {
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`

export {
  NavBar,
  NavHome,
  NavBarLink,
  NavCollapse
}