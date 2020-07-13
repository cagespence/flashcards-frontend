import React from 'react'

const Loading = (props) => {
  return (
    <div className={`lds-ellipsis ${props.light? 'light' : 'dark'}`}><div></div><div></div><div></div><div></div></div>
  )
}

export default Loading