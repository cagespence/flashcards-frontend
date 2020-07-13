import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

export const PageTitle = ({children}) => {
  return (
    <Heading>
      {children}
    </Heading>
  )
}

