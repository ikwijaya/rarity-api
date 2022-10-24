import React from 'react'
import { Route } from 'react-router-dom'

export const GeneralRoute = ({ component: Component, ...res }) => {
  return (
    <React.Fragment>
      <Route 
        {...res} 
        render = {
          (props) => <Component {...res} {...props} />
        } 
      />
    </React.Fragment>
  )
}